import SkillsData from '../../db/skill-table.json';

export const SkillQuery = {
  skills: (root, args) => {
    if (args.name) {
      return SkillsData.filter(skill => skill.name === args.name);
    } else {
      return SkillsData;
    }
  },
};
