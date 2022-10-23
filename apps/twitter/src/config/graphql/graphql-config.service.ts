import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';

import { Config } from '../configuration.type';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService<Config>) {}

  public createGqlOptions(): ApolloDriverConfig {
    const { playground } = this.configService.get('graphql');

    return {
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credentials: true,
        origin: true,
      },
      disableHealthCheck: true,
      // introspection: false,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    };
  }
}
