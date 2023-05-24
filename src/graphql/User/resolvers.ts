/**
 * Resolvers for the fields of the types.ts -> User type. Any fields that have no resolver will
 * be using the default resolver (the field that matches in the data).
 */
export const UserResolvers = {
  skills: (parent, _args, contextValue) => {
    const { skillsDataSource, usersDataSource } = contextValue;
    const rawUserSkills = usersDataSource.read({ id: parent.id })[0].skills;

    return Object.entries(rawUserSkills).map(([skillId, value]) => ({
      skill: skillsDataSource.read({ id: skillId })[0],
      level: value,
    }));
  },
};
