export const SkillTypes = `#graphql
  # Types
  type Skill {
    id: ID!
    name: String!
    levelDescriptions: [String!]!
  }

  # Queries
  extend type Query {
    skills(id: String): [Skill!]
  }

  # Mutations
  extend type Mutation {
    createSkill(
      name: String!
      levelDescriptions: [String!]!
    ): Skill

    editSkill(
      id: ID!
      name: String
      levelDescriptions: [String!]!
    ): Skill

    deleteSkill(
      id: ID!
    ): Skill
  }
`;
