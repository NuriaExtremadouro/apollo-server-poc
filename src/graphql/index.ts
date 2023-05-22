import { CheckQuery, CheckTypes } from './Check';
import { ProjectQuery, ProjectResolvers, ProjectTypes } from './Project';
import { SkillMutation, SkillQuery, SkillTypes } from './Skill';
import { UserQuery, UserResolvers, UserTypes } from './User';

// remember we only use gql in this file. types in other files are just simple strings
export const typeDefs = `#graphql
  type Query
  type Mutation
  ${CheckTypes}
  ${ProjectTypes}
  ${SkillTypes}
  ${UserTypes}
`;

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
