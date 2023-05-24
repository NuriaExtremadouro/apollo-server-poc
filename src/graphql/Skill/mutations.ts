import { GraphQLError } from "graphql";

import {
  MutationCreateSkillArgs,
  MutationDeleteSkillArgs,
  MutationEditSkillArgs,
} from "../../generated/graphql";
import { Context } from "../..";

/**
 * Resolvers for the fields of the types.ts -> Mutations definitions
 */
export const SkillMutation = {
  createSkill: (_root: any, args: MutationCreateSkillArgs, contextValue: Context) => {
    const { levelDescriptions } = args.newSkill;

    if (levelDescriptions.length !== 4) {
      // Using GraphQLError we can be more detailed about why specific errors happen
      throw new GraphQLError('Field levelDescriptions should be exactly 4 strings', {
        extensions: { code: 'BAD_ARGS', argumentsReceived: args.newSkill },
      });
    }

    return contextValue.skillsDataSource.create(args.newSkill);
  },
  editSkill: (_root: any, args: MutationEditSkillArgs, contextValue: Context) => {
    const { levelDescriptions } = args.editedSkill;

    if (levelDescriptions.length !== 4) {
      throw new GraphQLError('Field levelDescriptions should be exactly 4 strings', {
        extensions: { code: 'BAD_ARGS', argumentsReceived: args.editedSkill },
      });
    }

    return contextValue.skillsDataSource.update(args.editedSkill);
  },
  deleteSkill: (_root: any, args: MutationDeleteSkillArgs, contextValue: Context) => {
    return contextValue.skillsDataSource.delete(args.id);
  },
};
