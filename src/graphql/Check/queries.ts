/**
 * Resolvers for the fields of the types.ts -> Queries definitions
 */
export const CheckQuery = {
  checks: (_root, args, contextValue) => {
    return contextValue.checksDataSource.read({ name: args.name });
  },
};
