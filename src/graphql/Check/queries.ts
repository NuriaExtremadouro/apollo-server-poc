import ChecksData from '../../db/check-table.json';

export const CheckQuery = {
  checks: (root, args) => {
    if (args.name) {
      return ChecksData.filter(check => check.name === args.name);
    } else {
      return ChecksData;
    }
  },
};
