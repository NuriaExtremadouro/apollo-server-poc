import { Check } from './Check';
import { Project } from './Project';
import { Skill } from './Skill';
import { User } from './User';

const resolvers = {
  Query: {
    ...Check.resolvers.queries,
    ...Project.resolvers.queries,
    ...Skill.resolvers.queries,
    ...User.resolvers.queries,
  },
  Mutation: {
    // ...Check.resolvers.mutations,
    // ...Project.resolvers.mutations,
    // ...Skill.resolvers.mutations,
    ...User.resolvers.mutations,
  }
};

export default resolvers;
