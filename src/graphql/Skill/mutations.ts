import fs from 'fs';
import { v4 as uuid } from 'uuid';

import SkillsData from '../../db/skill-table.json';

export const SkillMutation = {
  createSkill: (root, args) => {
    const { name, levelDescriptions } = args;

    if (!name || !levelDescriptions) {
      throw Error('Missing parameters to create a new skill');
    }

    const newSkillId = uuid();
    const newSkill = {
      id: newSkillId,
      name,
      levelDescriptions,
    };

    SkillsData.push(newSkill);

    fs.writeFile('src/db/skill-table.json', JSON.stringify(SkillsData, null, 2), { flag: 'w' }, function (err) {
      if (err) return console.error(err);
    });
    
    return newSkill;
  },
  editSkill: (root, args) => {
    const { id, name, levelDescriptions } = args;

    if (!id || !name || !levelDescriptions) {
      throw Error('Missing parameters to edit a skill');
    }

    const updatedSkill = {
      id,
      name,
      levelDescriptions,
    };

    const skillToUpdateIndex = SkillsData.findIndex(skill => skill.id === id);
    if (skillToUpdateIndex === -1) {
      throw Error('Skill does not exist');
    }

    SkillsData[skillToUpdateIndex] = updatedSkill;

    fs.writeFile('src/db/skill-table.json', JSON.stringify(SkillsData, null, 2), { flag: 'w' }, function (err) {
      if (err) return console.error(err);
    });
    
    return updatedSkill;
  },
  deleteSkill: (root, args) => {
    const { id } = args;

    if (!id) {
      throw Error('Missing parameters to delete a skill');
    }

    const skillToDeleteIndex = SkillsData.findIndex(skill => skill.id === id);
    if (skillToDeleteIndex === -1) {
      throw Error('Skill does not exist');
    }

    const deletedSkill = SkillsData.splice(skillToDeleteIndex, 1)[0];
  
    fs.writeFile('src/db/skill-table.json', JSON.stringify(SkillsData, null, 2), { flag: 'w' }, function (err) {
      if (err) return console.error(err);
    });
    
    return deletedSkill;
  },
};
