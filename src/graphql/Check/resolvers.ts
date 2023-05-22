import ChecksData from '../../db/check-table.json';

const queries = {
  checks: (root, args) => {
    if (args.id) {
      return [ChecksData.find(check => check.id === args.id)];
    } else {
      return ChecksData;
    }
  },
};

export const resolvers = { queries };
