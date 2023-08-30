const { makeExecutableSchema } = require('@graphql-tools/schema');

const fs = require('fs');

export const typeDefs = fs
  .readFileSync('./graphql/schema.gql')
  .toString('utf-8');
