import UsersData from '../../db/user-table.json';

export const UserQuery = {
  users: (root, args) => {
    if (args.id) {
      return UsersData.filter(user => user.id === args.id);
    } else {
      return UsersData;
    }
  },
};
