"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const check_group_table_json_1 = __importDefault(require("./db/check-group-table.json"));
const check_table_json_1 = __importDefault(require("./db/check-table.json"));
const pair_table_json_1 = __importDefault(require("./db/pair-table.json"));
const project_table_json_1 = __importDefault(require("./db/project-table.json"));
const skill_table_json_1 = __importDefault(require("./db/skill-table.json"));
const skill_group_table_json_1 = __importDefault(require("./db/skill-group-table.json"));
const user_table_json_1 = __importDefault(require("./db/user-table.json"));
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
        checkGroups: () => {
            console.log(check_group_table_json_1.default);
            return [];
        },
        checks: () => check_table_json_1.default,
        pairs: () => pair_table_json_1.default,
        projects: () => project_table_json_1.default,
        skillGroups: () => skill_group_table_json_1.default,
        skills: () => skill_table_json_1.default,
        users: () => user_table_json_1.default,
    },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: http://localhost:4000/`);
//# sourceMappingURL=index.js.map