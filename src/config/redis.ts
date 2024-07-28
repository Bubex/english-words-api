import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';

const redis = new Redis(redisUrl);

export const closeRedisConnection = () => {
  return redis.quit();
};

export default redis;
