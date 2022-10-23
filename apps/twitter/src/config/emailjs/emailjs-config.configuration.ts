import { EmailjsConfig } from './emailjs-config.type';

export const emailjsConfiguration = (): EmailjsConfig => {
  return {
    emailjs: {
      privateKey: process.env.TWITTER_EMAILJS_PRIVATE_API_KEY,
      publicKey: process.env.TWITTER_EMAILJS_PUBLIC_API_KEY,
    },
  };
};
