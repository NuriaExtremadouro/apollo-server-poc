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

  # Input
  input UsersFilters {
    name: String
    address: String
    phone: String
    email: String
  }

  # Queries
  extend type Query {
    users(filters: UsersFilters): [User!]
  }
`;
