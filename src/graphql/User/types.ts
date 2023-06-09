export const UserTypes = `#graphql
  # Types
  "Type to describe a user"
  type User {
    "UUID"
    id: ID!
    "Full name"
    fullName: String!
    "First name"
    firstName: String!
    "Last name"
    lastName: String!
    "Full address"
    address: String
    "Phone"
    phone: String
    "Email"
    email: String
    "Birth date"
    birthDate: String!
    "Date when the user joined"
    joinedDate: String!
    "Role of the user within the company"
    role: String!
    "Name of the project in which this user is working"
    projectName: String
    "Skills that this user has"
    skills: [UserSkill!]
  }

  "Type to describe the skills a user has and the level it has for them"
  type UserSkill {
    "Skill that the user has"
    skill: Skill!
    "The level (1-4) that the user has for the skill"
    level: Int
  }

  # Input
  "Available filters to be used as the argument when querying users"
  input UsersFilters {
    "User id"
    id: String
    "Full user name"
    fullName: String
    "Full user address"
    address: String
    "User phone"
    phone: String
    "User email"
    email: String
  }

  # Queries
  extend type Query {
    "Query to get users (filtered or not)"
    users(filters: UsersFilters): [User!]
  }
`;
