import { ApplicationConfig } from './application';
import { AwsConfig } from './aws';
import { EmailjsConfig } from './emailjs';
import { GraphqlConfig } from './graphql';
import { PrismaConfig } from './prisma';
import { RabbitmqConfig } from './rabbitmq';
import { RedisConfig } from './redis';

export interface Config
  extends ApplicationConfig,
    AwsConfig,
    EmailjsConfig,
    GraphqlConfig,
    PrismaConfig,
    RabbitmqConfig,
    RedisConfig {}
