import UsersData from '../../db/user-table.json';

const queries = {
  users: (root, args) => {
    if (args.id) {
      return [UsersData.find(user => user.id === args.id)];
    } else {
      return UsersData;
    }
  },
};

const mutations = {
  createUser: (root, args) => {
    const newUser = {
      id: "54321",
      email: args.email,
      password: args.password,
      loggedIn: false,
      firstName: args.firstName,
      lastName: args.lastName,
    };
    
    return newUser;
  },
};

export const resolvers = { queries, mutations };
