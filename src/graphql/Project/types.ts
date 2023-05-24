export const ProjectTypes = `#graphql
  # Types
  type Project {
    id: ID!
    name: String!
    members: [String!]!
    reviews: [Review!]
  }

  type Review {
    check: Check!
    level: Int
  }

  # Queries
  extend type Query {
    projects(name: String): [Project!]
  }
`;
