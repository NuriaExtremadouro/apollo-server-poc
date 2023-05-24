/**
 * Resolvers for the fields of the types.ts -> Queries definitions
 */
export const UserQuery = {
  users: (_root, args, contextValue) => {
    return contextValue.usersDataSource.read(args.filters);
  },
};
