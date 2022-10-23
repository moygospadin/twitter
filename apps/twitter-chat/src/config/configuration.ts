import { applicationConfiguration } from './application';
import { graphqlConfiguration } from './graphql';
import { prismaConfiguration } from './prisma';
import { rabbitmqConfiguration } from './rabbitmq';
import { redisConfiguration } from './redis';

export const configuration = [
  applicationConfiguration,
  graphqlConfiguration,
  prismaConfiguration,
  rabbitmqConfiguration,
  redisConfiguration,
];
