import { RabbitmqConfig } from './rabbitmq-config.type';

export const rabbitmqConfiguration = (): RabbitmqConfig => {
  return {
    rabbitmq: {
      url: process.env.TWITTER_PAGE_MESSAGES_RABBITMQ_URL,
    },
  };
};
