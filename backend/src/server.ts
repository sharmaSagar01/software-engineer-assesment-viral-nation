import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive';

import { ApolloError, ApolloServer } from 'apollo-server';
import resolvers from './utils/resolver';
import createContext from './utils/context';
import { typeDefs } from './utils/typeDefs';
import { makeExecutableSchema } from '@graphql-tools/schema';

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
});

schema = constraintDirective()(schema);

const server = new ApolloServer({
  schema,
  formatError: (error) => {
    if (error.extensions?.code === 'INTERNAL_SERVER_ERROR') {
      if (error.extensions.exception?.code === 'P2025') {
        throw new ApolloError('No data found', 'NOT_FOUND');
      }
      if (error.extensions.exception?.code === 'P2002') {
        return new ApolloError('Data already Exists', 'ALREADY_EXISTS');
      }
    }
    throw error;
  },

  context: createContext(),
});

server.listen({ port: 4000 }).then(({ url }) => console.log({ url }));
