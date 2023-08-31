import createApolloServer from './server';

createApolloServer()
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log({ url }));
