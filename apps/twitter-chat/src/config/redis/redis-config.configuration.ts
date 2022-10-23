import { RedisConfig } from './redis-config.type';

export const redisConfiguration = (): RedisConfig => {
  return {
    redis: {
      url: process.env.TWITTER_PAGE_MESSAGES_REDIS_URL,
    },
  };
};
