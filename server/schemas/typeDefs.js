const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
}

type Recipe {
  _id: ID!
  title: String!
  ingredients: [String!]!
  instructions: String!
  createdBy: User!
  createdAt: String!
}

type Comment {
  _id: ID!
  content: String!
  user: User!
  recipe: Recipe!
  createdAt: String!
}

type Query {
  getUserById(userId: ID!): User
  getRecipeById(recipeId: ID!): Recipe
  getCommentById(commentId: ID!): Comment
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): User
  createRecipe(title: String!, ingredients: [String!]!, instructions: String!, createdBy: ID!): Recipe
  createComment(content: String!, user: ID!, recipe: ID!): Comment
}

`;

module.exports = typeDefs;

