import { RedisConfig } from './redis-config.type';

export const redisConfiguration = (): RedisConfig => {
  return {
    redis: {
      url: process.env.TWITTER_REDIS_URL,
    },
  };
};
