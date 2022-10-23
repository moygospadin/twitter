import { ApplicationConfig } from './application-config.type';

export const applicationConfiguration = (): ApplicationConfig => {
  return {
    application: {
      port: parseInt(process.env.TWITTER_PAGE_MESSAGES_PORT, 10),
    },
  };
};
