import { Context } from "../..";
import { QueryProjectsArgs } from "../../generated/graphql";

/**
 * Resolvers for the fields of the types.ts -> Queries definitions
 */
export const ProjectQuery = {
  projects: (_root: any, args: QueryProjectsArgs, contextValue: Context) => {
    return contextValue.projectsDataSource.read({ id: args.id, name: args.name });
  },
};
