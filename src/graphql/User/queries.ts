import UsersData from '../../db/user-table.json';

export const UserQuery = {
  users: (root, args) => {
    const { name, address, phone, email } = args.filters;
    let result = UsersData;

    if (name) {
      result = UsersData.filter(user => user.name === name);
    }

    if (address) {
      result = UsersData.filter(user => user.address === address);
    }

    if (phone) {
      result = UsersData.filter(user => user.phone === phone);
    }

    if (email) {
      result = UsersData.filter(user => user.email === email);
    }

    return result;
  },
};
