import { RedisModule } from '@nestjs-modules/ioredis';
import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { GqlAuthMiddleware, SESSION_STORAGE_TOKEN } from '@libs/auth';
import { PrismaModule } from '@libs/prisma';
import { RabbitmqModule } from '@libs/rabbitmq';

import {
  configuration,
  GraphqlConfigService,
  PrismaConfigService,
  RabbitmqConfigService,
  RedisConfigService,
  validate,
} from './config';
import { SessionCacheRepository } from './modules/auth-session/infrastructure';
import { ChatModule } from './modules/chat';
import { ChatMessageModule } from './modules/chat-message';
import { WsConnectionModule } from './modules/ws-connection';

@Module({
  controllers: [],
  exports: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration, validate }),
    GraphQLModule.forRootAsync({ driver: ApolloDriver, imports: [WsConnectionModule], useClass: GraphqlConfigService }),
    PrismaModule.registerAsync({ useClass: PrismaConfigService }),
    RabbitmqModule.registerAsync({ useClass: RabbitmqConfigService }),
    RedisModule.forRootAsync({ useClass: RedisConfigService }),
    ChatMessageModule,
    ChatModule,
  ],
  providers: [{ provide: SESSION_STORAGE_TOKEN, useClass: SessionCacheRepository }],
})
export class ServiceTwitterChatModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(GqlAuthMiddleware).exclude('/api').forRoutes('/graphql');
  }
}
