import { ApolloError, ApolloServer } from 'apollo-server';
import createContext from './utils/context';
import schema from './schema';

function createApolloServer() {
  return new ApolloServer({
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
    context: createContext,
  });
}

export default createApolloServer;
