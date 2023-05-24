/**
 * Resolvers for the fields of the types.ts -> Mutations definitions
 */
export const SkillMutation = {
  createSkill: (_root, args, contextValue) => {
    const { name, levelDescriptions } = args.newSkill;

    if (!name || !levelDescriptions) {
      throw Error('Missing parameters to create a new skill');
    }

    return contextValue.skillsDataSource.create(args.newSkill);
  },
  editSkill: (_root, args, contextValue) => {
    const { id, name, levelDescriptions } = args.editedSkill;

    if (!id || !name || !levelDescriptions) {
      throw Error('Missing parameters to edit a skill');
    }

    return contextValue.skillsDataSource.update(args.editedSkill);
  },
  deleteSkill: (_root, args, contextValue) => {
    const { id } = args;

    if (!id) {
      throw Error('Missing parameters to delete a skill');
    }

    return contextValue.skillsDataSource.delete(id);
  },
};
