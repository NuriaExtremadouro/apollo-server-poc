import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs, resolvers } from './graphql'
import { JsonDataSource } from './jsonDataSource';

interface Context {
  checksDataSource: JsonDataSource;
  projectsDataSource: JsonDataSource;
  skillsDataSource: JsonDataSource;
  usersDataSource: JsonDataSource;
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
})

console.log(`🚀  Server ready at: http://localhost:4000/`);

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  context: async ({ req, res }) => ({
    checksDataSource: new JsonDataSource('checks'),
    projectsDataSource: new JsonDataSource('projects'),
    skillsDataSource: new JsonDataSource('skills'),
    usersDataSource: new JsonDataSource('users'),
  }),
  listen: { port: 4000 },
});
