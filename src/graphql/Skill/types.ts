export const SkillTypes = `#graphql
  # Types
  type Skill {
    id: ID!
    name: String!
    levelDescriptions: [String!]!
  }

  # Input
  input CreateSkill {
    name: String!
    levelDescriptions: [String!]!
  }

  input EditSkill {
    id: ID!
    name: String
    levelDescriptions: [String!]
  }

  # Queries
  extend type Query {
    skills(name: String): [Skill!]
  }

  # Mutations
  extend type Mutation {
    createSkill(newSkill: CreateSkill): Skill

    editSkill(editedSkill: EditSkill): Skill

    deleteSkill(
      id: ID!
    ): Skill
  }
`;
