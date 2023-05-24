import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs, resolvers } from './graphql'
import { JsonDataSource } from './providers/jsonDataSource';

// Interface of the context configured when creating the Express app
export interface Context {
  checksDataSource: JsonDataSource;
  projectsDataSource: JsonDataSource;
  skillsDataSource: JsonDataSource;
  usersDataSource: JsonDataSource;
}

// ApolloServer instance with our schema and its resolvers
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
})

console.log(`🚀  Server ready at: http://localhost:4000/`);

// Create Express app and use the ApolloServer as middleware
// The context allows us to have instances to connect to our datasources easily from all resolvers
// We could also use the req/res to check headers, tokens, etc. to authenticate users and more
startStandaloneServer(server, {
  context: async ({ req, res }) => ({
    checksDataSource: new JsonDataSource('checks'),
    projectsDataSource: new JsonDataSource('projects'),
    skillsDataSource: new JsonDataSource('skills'),
    usersDataSource: new JsonDataSource('users'),
  }),
  listen: { port: 4000 },
});
