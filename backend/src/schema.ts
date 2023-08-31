import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive';
import { typeDefs } from './utils/typeDefs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
});

export default constraintDirective()(schema);
