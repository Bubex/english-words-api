import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IRequest } from '../types/IRequest';

interface JwtPayload {
  id: string;
  name: string;
}

export const authMiddleware = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token malformatted' });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid' });
    }

    const { id } = decoded as JwtPayload;
    req.userId = id;

    return next();
  });
};
