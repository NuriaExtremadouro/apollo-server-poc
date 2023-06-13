export const SkillTypes = `#graphql
  # Types
  "Type to describe a skill"
  type Skill {
    "UUID"
    id: ID!
    "Name"
    name: String!
    "Descriptions of what a user is expected to know when they have a given level from 1-4"
    levelDescriptions: [String!]!
  }

  # Input
  "Skill data to be used as the argument when calling the mutation createSkill"
  input CreateSkill {
    "Skill name"
    name: String!
    "Strings to be used for the 4 levels a skill can have"
    levelDescriptions: [String!]!
  }

  "Skill data to be used as the argument when calling the mutation editSkill"
  input EditSkill {
    "UUID of the skill to edit"
    id: ID!
    "Edited skill name"
    name: String
    "Edited descriptions of the 4 levels a skill can have"
    levelDescriptions: [String!]
  }

  # Queries
  extend type Query {
    "Query to get skills (filtered or not)"
    skills(id: String, name: String): [Skill!]
  }

  # Mutations
  extend type Mutation {
    "Mutation to create a new skill"
    createSkill(newSkill: CreateSkill!): Skill
    "Mutation to edit an existing skill"
    editSkill(editedSkill: EditSkill!): Skill
    "Mutation to delete an existing skill"
    deleteSkill(id: String!): Skill
  }
`;
