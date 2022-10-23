import { PrismaConfig } from './prisma-config.type';

export const prismaConfiguration = (): PrismaConfig => {
  return {
    prisma: {
      url: process.env.TWITTER_POSTGRES_URL,
    },
  };
};
