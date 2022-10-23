import { AwsModule } from '@jebulday/aws';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';

import { GqlAuthMiddleware, SESSION_STORAGE_TOKEN } from '@libs/auth';
import { CryptoModule } from '@libs/crypto';
import { PrismaModule } from '@libs/prisma';
import { RabbitmqModule } from '@libs/rabbitmq';
import { TimeModule } from '@libs/time';

import {
  AwsConfigService,
  configuration,
  eventEmitterConfiguration,
  GraphqlConfigService,
  PrismaConfigService,
  RabbitmqConfigService,
  RedisConfigService,
  validate,
} from './config';
import { AuthRefreshTokenModule } from './modules/auth-refresh-token';
import { AuthSessionModule } from './modules/auth-session';
import { SessionCacheRepository } from './modules/auth-session/infrastructure/repositories';
import { AuthSignInModule } from './modules/auth-sign-in';
import { AuthSignOutModule } from './modules/auth-sign-out';
import { AuthSignUpModule } from './modules/auth-sign-up';
import { InboundEeModule } from './modules/event-emitter/inbound';
import { PageProfileModule } from './modules/page-profile';
import { TwitterRecordModule } from './modules/twitter-record';
import { TwitterRecordCommentModule } from './modules/twitter-record-comment';
import { TwitterRecordRetweetModule } from './modules/twitter-record-retweet';
import { TwitterRecordTweetModule } from './modules/twitter-record-tweet';
import { UserModule } from './modules/user';
import { UserAccountModule } from './modules/user-account';

@Module({
  exports: [],
  imports: [
    AwsModule.registerAsync({ useClass: AwsConfigService }),
    ConfigModule.forRoot({ isGlobal: true, load: configuration, validate }),
    EventEmitterModule.forRoot(eventEmitterConfiguration),
    GraphQLModule.forRootAsync({ driver: ApolloDriver, useClass: GraphqlConfigService }),
    PrismaModule.registerAsync({ useClass: PrismaConfigService }),
    RabbitmqModule.registerAsync({ useClass: RabbitmqConfigService }),
    RedisModule.forRootAsync({ useClass: RedisConfigService }),
    AuthRefreshTokenModule,
    AuthSessionModule,
    AuthSignInModule,
    AuthSignOutModule,
    AuthSignUpModule,
    CryptoModule,
    InboundEeModule,
    PageProfileModule,
    TimeModule,
    TwitterRecordCommentModule,
    TwitterRecordModule,
    TwitterRecordRetweetModule,
    TwitterRecordTweetModule,
    UserAccountModule,
    UserModule,
  ],
  providers: [{ provide: SESSION_STORAGE_TOKEN, useClass: SessionCacheRepository }],
})
export class ServiceTwitterModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(GqlAuthMiddleware).exclude('/api').forRoutes('/graphql');
  }
}
