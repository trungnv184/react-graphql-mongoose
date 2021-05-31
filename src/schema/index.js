const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    email: String!
    JoinDate: String
    favorites: [Recipe]
  }

  type Recipe {
    name: String!
    category: String!
    description: String
    instructions: String
    createdDate: String
    likes: Int
    username: String
  }

  type Query {
    users: [User]
    getAllRecipes: [Recipe]
  }

  input RecipeInput {
    name: String
    category: String
    description: String
    instructions: String
    username: String
  }

  type Mutation {
    addRecipe(input: RecipeInput): Recipe
  }
`;

module.exports = typeDefs;
