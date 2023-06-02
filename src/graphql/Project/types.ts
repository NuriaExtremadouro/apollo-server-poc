export const ProjectTypes = `#graphql
  # Types
  "Type to describe a project"
  type Project {
    "UUID"
    id: ID!
    "Name"
    name: String!
    "Names of the users that are working on this project"
    members: [String!]!
    "Ratings that this project has received for different subjects (testing, automation, etc.)"
    reviews: [Review!]
  }

  "Type to describe the values a project has for each of the checks that get reviewed"
  type Review {
    "Check that was reviewed"
    check: Check!
    "The level (1-4) that the check has for the project"
    level: Int
  }

  # Queries
  extend type Query {
    "Query to get projects (filtered or not)"
    projects(id: String, name: String): [Project!]
  }
`;
