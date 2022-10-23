import { GraphqlConfig } from './graphql-config.type';

export const graphqlConfiguration = (): GraphqlConfig => {
  return {
    graphql: {
      playground: process.env.SERVICE_SUBSCRIPTIONS_GRAPHQL_PLAYGROUND === 'true',
    },
  };
};
