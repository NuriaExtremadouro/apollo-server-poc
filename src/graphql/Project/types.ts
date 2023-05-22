export const types = `#graphql
  type Project {
    id: ID!
    name: String!
    "Only the member names"
    members: [String!]!
    reviews: [Review!]
  }

  type Review {
    check: Check!
    level: Int
  }
`;
