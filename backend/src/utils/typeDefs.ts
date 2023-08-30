import fs from 'fs';

export const typeDefs = fs
  .readFileSync('./graphql/schema.gql')
  .toString('utf-8');
