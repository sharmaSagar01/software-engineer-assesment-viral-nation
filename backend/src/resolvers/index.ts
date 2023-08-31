import * as Scalar from './Scalar';
import * as Type from './Type';
import { Mutation } from './Mutation';
import { Query } from './Query';

const resolvers = {
  ...Scalar,
  Query,
  Mutation,
  ...Type,
};

console.log(resolvers.Query);

export default resolvers;
