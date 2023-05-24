import { Context } from "../..";
import { QueryUsersArgs } from "../../generated/graphql";

/**
 * Resolvers for the fields of the types.ts -> Queries definitions
 */
export const UserQuery = {
  users: (_root: any, args: QueryUsersArgs, contextValue: Context) => {
    return contextValue.usersDataSource.read(args.filters);
  },
};
