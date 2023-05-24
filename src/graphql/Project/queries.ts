import ProjectsData from '../../db/project-table.json';

export const ProjectQuery = {
  projects: (root, args) => {
    if (args.name) {
      return ProjectsData.filter(project => project.name === args.name);
    } else {
      return ProjectsData;
    }
  },
};
