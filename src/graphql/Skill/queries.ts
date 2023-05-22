import SkillsData from '../../db/skill-table.json';

export const SkillQuery = {
  skills: (root, args) => {
    if (args.id) {
      return SkillsData.filter(skill => skill.id === args.id);
    } else {
      return SkillsData;
    }
  },
};
