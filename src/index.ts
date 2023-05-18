import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import CheckGroupsData from './db/check-group-table.json';
import ChecksData from './db/check-table.json';
import PairsData from './db/pair-table.json';
import ProjectsData from './db/project-table.json';
import SkillsData from './db/skill-table.json';
import SkillGroupsData from './db/skill-group-table.json';
import UsersData from './db/user-table.json';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Query {
    checkGroups: [CheckGroup]
    checks: [Check]
    projects: [Project]
    skillGroups: [SkillGroup]
    skills: [Skill]
    users: [User]
    pairs: [Pair]
  }

  type CheckGroup {
    id: ID!
    name: String!
    checks: [Check!]!
  }

  type Check {
    id: ID!
    name: String!
    levelDescriptions: [String!]!
    checkGroupName: String!
  }

  type Project {
    id: ID!
    name: String!
    "Only the member names"
    members: [String!]!
    reviews: [Review!]
  }
  
  type Review {
    check: Check!
    level: Int
  }

  type SkillGroup {
    id: ID!
    name: String!
    skills: [Skill!]!
  }

  type Skill {
    id: ID!
    name: String!
    levelDescriptions: [String!]!
    skillGroupName: String!
  }

  type User {
    id: ID!
    name: String!
    address: String
    phone: String
    email: String
    projectName: String
    skills: [UserSkill!]
  }

  type UserSkill {
    skill: Skill!
    level: Int
  }

  type Pair {
    id: ID!
    usersPaired: [String!]!
    language: Language
  }

  enum Language {
    ENGLISH
    SPANISH
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    checkGroups: () => CheckGroupsData,
    checks: () => ChecksData,
    pairs: () => PairsData,
    projects: () => ProjectsData,
    skillGroups: () => SkillGroupsData,
    skills: () => SkillsData,
    users: () => UsersData,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log(`🚀  Server ready at: http://localhost:4000/`);

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: 4000 },
});
