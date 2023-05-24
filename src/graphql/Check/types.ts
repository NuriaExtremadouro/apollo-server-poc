export const CheckTypes = `#graphql
  # Types
  """
  Type to describe a check, which are the things that projects should have implemented (testing,
  automation, etc.)
  """
  type Check {
    "UUID"
    id: ID!
    "Name"
    name: String!
    "Descriptions of what a project is expected to have when they have a given level from 1-4"
    levelDescriptions: [String!]!
  }

  # Queries
  extend type Query {
    "Query to get checks (filtered or not)"
    checks(name: String): [Check!]
  }
`;
