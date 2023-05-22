import ProjectsData from '../../db/project-table.json';

export const ProjectQuery = {
  projects: (root, args) => {
    if (args.id) {
      return ProjectsData.filter(project => project.id === args.id);
    } else {
      return ProjectsData;
    }
  },
};
