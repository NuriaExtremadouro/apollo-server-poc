import { Context } from "../..";
import { QuerySkillsArgs } from "../../generated/graphql";

/**
 * Resolvers for the fields of the types.ts -> Queries definitions
 */
export const SkillQuery = {
  skills: (_root: any, args: QuerySkillsArgs, contextValue: Context) => {
    return contextValue.skillsDataSource.read({ id: args.id, name: args.name });
  },
};
