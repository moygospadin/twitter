import { ApplicationConfig } from './application';
import { GraphqlConfig } from './graphql';
import { PrismaConfig } from './prisma';
import { RabbitmqConfig } from './rabbitmq';
import { RedisConfig } from './redis';

export interface Config extends ApplicationConfig, GraphqlConfig, PrismaConfig, RabbitmqConfig, RedisConfig {}
