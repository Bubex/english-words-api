import { NextFunction, Request, Response } from 'express';

import redis from '../config/redis';

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = req.originalUrl;

  const start = Date.now();

  const cachedResponse = await redis.get(key);

  if (cachedResponse) {
    res.setHeader('x-cache', 'HIT');
    res.setHeader('x-response-time', `${Date.now() - start}ms`);
    return res.send(JSON.parse(cachedResponse));
  }

  res.setHeader('x-cache', 'MISS');

  const originalSend = res.send.bind(res);
  res.send = (body: any) => {
    redis.set(key, JSON.stringify(body), 'EX', 60 * 60);
    res.setHeader('x-response-time', `${Date.now() - start}ms`);
    return originalSend(body);
  };

  next();
};
