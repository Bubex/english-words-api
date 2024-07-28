import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error('REDIS_URL is not defined in the environment variables');
}

const redis = new Redis(redisUrl);

export default redis;
