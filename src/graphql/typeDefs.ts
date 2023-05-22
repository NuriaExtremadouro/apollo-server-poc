// import { gql } from 'apollo-server-express'; // TODO: what for?

import { Check } from './Check';
import { Project } from './Project';
import { Skill } from './Skill';
import { User } from './User';

const typeDefs = `#graphql
  ${Check.types}
  ${Project.types}
  ${Skill.types}
  ${User.types}
  
  type Query {
    ${Check.queries}
    ${Project.queries}
    ${Skill.queries}
    ${User.queries}
  }
  
  type Mutation {
    ${User.mutations}
  }
`;

export default typeDefs;
