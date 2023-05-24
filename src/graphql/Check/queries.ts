import { Context } from "../..";
import { QueryChecksArgs } from "../../generated/graphql";

/**
 * Resolvers for the fields of the types.ts -> Queries definitions
 */
export const CheckQuery = {
  checks: (_root: any, args: QueryChecksArgs, contextValue: Context) => {
    return contextValue.checksDataSource.read({ name: args.name });
  },
};
