import { applicationConfiguration } from './application';
import { awsConfiguration } from './aws';
import { emailjsConfiguration } from './emailjs';
import { graphqlConfiguration } from './graphql';
import { prismaConfiguration } from './prisma';
import { rabbitmqConfiguration } from './rabbitmq';
import { redisConfiguration } from './redis';

export const configuration = [
  applicationConfiguration,
  awsConfiguration,
  emailjsConfiguration,
  graphqlConfiguration,
  prismaConfiguration,
  rabbitmqConfiguration,
  redisConfiguration,
];
