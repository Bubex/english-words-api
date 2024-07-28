import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function validationMiddleware(
  type: any,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const dto = plainToInstance(type, req.body);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) =>
          Object.values(error.constraints || {}).join(', '),
        )
        .join(', ');
      res.status(400).json({ message });
    } else {
      next();
    }
  };
}
