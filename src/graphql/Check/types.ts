export const CheckTypes = `#graphql
  # Types
  type Check {
    id: ID!
    name: String!
    levelDescriptions: [String!]!
  }

  # Queries
  extend type Query {
    checks(name: String): [Check!]
  }
`;
