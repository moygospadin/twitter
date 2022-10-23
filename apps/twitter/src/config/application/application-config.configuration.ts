import { ApplicationConfig } from './application-config.type';

export const applicationConfiguration = (): ApplicationConfig => {
  return {
    application: {
      appUrl: process.env.TWITTER_APP_URL,
      port: parseInt(process.env.TWITTER_PORT, 10),
    },
  };
};
