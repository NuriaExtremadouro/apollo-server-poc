import { makeExecutableSchema } from '@graphql-tools/schema';

import { CheckQuery, CheckTypes } from './Check';
import { ProjectQuery, ProjectResolvers, ProjectTypes } from './Project';
import { SkillMutation, SkillQuery, SkillTypes } from './Skill';
import { UserQuery, UserResolvers, UserTypes } from './User';

// Export our schema. Note that the Query and Mutation types are extended in types.ts files
export const typeDefs = `#graphql
  type Query
  type Mutation
  ${CheckTypes}
  ${ProjectTypes}
  ${SkillTypes}
  ${UserTypes}
`;

// Export the resolvers for our schema
export const resolvers = {
  Query: {
    ...CheckQuery,
    ...ProjectQuery,
    ...SkillQuery,
    ...UserQuery
  },
  Mutation: {
    ...SkillMutation,
  },
  Project: ProjectResolvers,
  User: UserResolvers
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});
