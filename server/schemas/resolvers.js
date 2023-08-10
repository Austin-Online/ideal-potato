const { AuthenticationError } = require('apollo-server-express');
const { User, Comment, Recipe } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getUserById: async (_, { userId }) => {
      return await User.findById(userId);
    },
    getRecipeById: async (_, { recipeId }) => {
      return await Recipe.findById(recipeId);
    },
    getCommentById: async (_, { commentId }) => {
      return await Comment.findById(commentId);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const newUser = new User({ username, email, password });
      return await newUser.save();
    },
    createRecipe: async (_, { title, ingredients, instructions, createdBy }) => {
      const newRecipe = new Recipe({ title, ingredients, instructions, createdBy });
      return await newRecipe.save();
    },
    createComment: async (_, { content, user, recipe }) => {
      const newComment = new Comment({ content, user, recipe });
      return await newComment.save();
    },
  },
  Recipe: {
    createdBy: async (recipe) => {
      return await User.findById(recipe.createdBy);
    },
  },
  Comment: {
    user: async (comment) => {
      return await User.findById(comment.user);
    },
    recipe: async (comment) => {
      return await Recipe.findById(comment.recipe);
    },
  },
};

module.exports = resolvers;
