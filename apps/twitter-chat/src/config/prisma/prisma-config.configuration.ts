import { PrismaConfig } from './prisma-config.type';

export const prismaConfiguration = (): PrismaConfig => {
  return {
    prisma: {
      url: process.env.TWITTER_PAGE_MESSAGES_POSTGRES_URL,
    },
  };
};
