import SkillsData from '../../db/skill-table.json';

const queries = {
  skills: (root, args) => {
    if (args.id) {
      return [SkillsData.find(skill => skill.id === args.id)];
    } else {
      return SkillsData;
    }
  },
};

export const resolvers = { queries };
