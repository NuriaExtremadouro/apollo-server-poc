import { Context } from "../..";
import { Project } from "../../generated/graphql";

/**
 * Resolvers for the fields of the types.ts -> Project type. Any fields that have no resolver will
 * be using the default resolver (the field that matches in the data).
 * 
 * To keep things simple, these resolvers are reading from the data sources without batching the
 * calls. If we were reading from a real DB, we might want to batch to avoid reading the Projects
 * table once for the "members" field and and another time for the "reviews" field.
 * 
 * To do that we could use Dataloaders, which aren't part of Apollo, but interesting to consider.
 * In the current example, they could allow us to batch the Project reads into one. More info:
 * - https://www.apollographql.com/docs/apollo-server/data/fetching-rest/#using-with-dataloader
 */
export const ProjectResolvers = {
  members: (parent: Project, _args: any, contextValue: Context) => {
    const { projectsDataSource, usersDataSource } = contextValue;
    const rawMembers = projectsDataSource.read({ id: parent.id })[0].members;

    return rawMembers.map(memberId => usersDataSource.read({ id: memberId })[0].fullName);
  },
  reviews: (parent: Project, _args: any, contextValue: Context) => {
    const { checksDataSource, projectsDataSource } = contextValue;
    const rawReviews = projectsDataSource.read({ id: parent.id })[0].review;

    if (rawReviews) {
      return Object.entries(rawReviews).map(([checkId, value]) => ({
          check: checksDataSource.read({ id: checkId })[0],
          level: value,
      }));
    }

    return [];
  },
};
