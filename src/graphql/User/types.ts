export const UserTypes = `#graphql
  # Types
  type User {
    id: ID!
    name: String!
    address: String
    phone: String
    email: String
    projectName: String
    skills: [UserSkill!]
  }

  type UserSkill {
    skill: Skill!
    level: Int
  }

  # Queries
  extend type Query {
    users(id: String): [User!]
  }

  # Mutations
  extend type Mutation {
    createUser(
      name: String!
      address: String
      phone: String
      email: String
      projectName: String
    ): User
  }
`;
