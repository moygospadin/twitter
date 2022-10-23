import { GraphqlConfig } from './graphql-config.type';

export const graphqlConfiguration = (): GraphqlConfig => {
  return {
    graphql: {
      playground: JSON.parse(process.env.TWITTER_GRAPHQL_PLAYGROUND),
    },
  };
};
