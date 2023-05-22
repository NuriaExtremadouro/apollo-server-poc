export const mutations = `#graphql
  createUser(
    name: String!
    address: String
    phone: String
    email: String
    projectName: String
  ): User
`;
