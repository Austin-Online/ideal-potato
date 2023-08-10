const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    recipes: [Recipe]!
  }

  type Recipe {
    _id: ID
    title: String
    ingredients: [String]!
    instructions: String
    createdBy: User!
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    content: String
    user: User!
    recipe: Recipe!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    recipes: [Recipe]
    recipe(recipeId: ID!): Recipe
    comments: [Comment]
    comment(commentId: ID!): Comment
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRecipe(title: String!, ingredients: [String]!, instructions: String!): Recipe
    addComment(recipeId: ID!, content: String!): Recipe
    removeRecipe(recipeId: ID!): Recipe
    removeComment(recipeId: ID!, commentId: ID!): Recipe
  }
`;

module.exports = typeDefs;
