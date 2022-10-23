import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory, GraphQLSubscriptionTransportWsConfig } from '@nestjs/graphql';
import { Context } from 'apollo-server-core';

import { CurrentUser } from '@libs/auth';

import { WsConnectionService } from '../../modules/ws-connection/application';
import { Config } from '../configuration.type';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>, private readonly wsConnectionService: WsConnectionService) {}

  public createGqlOptions(): ApolloDriverConfig {
    const { playground } = this.configService.get('graphql');

    return {
      autoSchemaFile: true,
      context: (context) => {
        const { connection } = context;

        return {
          ...context,
          currentUser: connection?.context?.currentUser,
        };
      },
      cors: {
        credentials: true,
        origin: true,
      },
      disableHealthCheck: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      sortSchema: true,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql-ws',
        },
        'subscriptions-transport-ws': {
          onConnect: this.wsConnectionService.onConnect,
          onDisconnect: this.wsConnectionService.onDisconnect,
          path: '/graphql',
        },
      },
    };
  }
}
