import SkillsData from '../../db/skill-table.json';
import UsersData from '../../db/user-table.json';

export const UserResolvers = {
  skills: (parent, args) => {
    const rawUserSkills = UsersData.find(user => user.id === parent.id).skills;
    return Object.entries(rawUserSkills).map(([skillId, value]) => {
      return {
        skill: SkillsData.find(skill => skill.id === skillId),
        level: value,
      };
    });
  },
};
