/**
 * Resolvers for the fields of the types.ts -> Queries definitions
 */
export const SkillQuery = {
  skills: (_root, args, contextValue) => {
    return contextValue.skillsDataSource.read({ name: args.name });
  },
};
