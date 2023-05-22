import ChecksData from '../../db/check-table.json';

export const CheckQuery = {
  checks: (root, args) => {
    if (args.id) {
      return ChecksData.filter(check => check.id === args.id);
    } else {
      return ChecksData;
    }
  },
};
