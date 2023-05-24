/**
 * Resolvers for the fields of the types.ts -> Queries definitions
 */
export const ProjectQuery = {
  projects: (_root, args, contextValue) => {
    return contextValue.projectsDataSource.read({ name: args.name });
  },
};
