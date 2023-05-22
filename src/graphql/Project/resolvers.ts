import ProjectsData from '../../db/project-table.json';

const queries = {
  projects: (root, args) => {
    if (args.id) {
      return [ProjectsData.find(project => project.id === args.id)];
    } else {
      return ProjectsData;
    }
  },
};

export const resolvers = { queries };
