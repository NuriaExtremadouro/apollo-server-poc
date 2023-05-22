export const SkillMutation = {
  createSkill: (root, args) => {
    const newSkill = {
      id: '54321',
      name: 'Some Skill',
      levelDescriptions: [],
    };
    
    return newSkill;
  },
  editSkill: (root, args) => {
    const updatedSkill = {
      id: '54321',
      name: 'Some Skill',
      levelDescriptions: [],
    };
    
    return updatedSkill;
  },
  deleteSkill: (root, args) => {
    const deletedSkill = {
      id: '54321',
      name: 'Some Skill',
      levelDescriptions: [],
    };
    
    return deletedSkill;
  },
};
