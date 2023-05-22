import ChecksData from '../../db/check-table.json';
import ProjectsData from '../../db/project-table.json';
import UsersData from '../../db/user-table.json';

export const ProjectResolvers = {
  members: (parent, args) => {
    const rawMembers = ProjectsData.find(project => project.id === parent.id).members;
    return rawMembers.map(memberId => UsersData.find(user => user.id === memberId).name);
  },
  reviews: (parent, args) => {
    const rawReviews = ProjectsData.find(project => project.id === parent.id).review;
    return Object.entries(rawReviews).map(([checkId, value]) => {
      return {
        check: ChecksData.find(check => check.id === checkId),
        level: value,
      };
    });
  },
};
