const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe, Comment } = require('../models'); // Update with your correct model imports
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Retrieve a list of users, populate their recipes
    users: async () => {
      return User.find().populate('recipes');
    },

    // Retrieve a user by their username, populate their recipes
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('recipes');
    },

    // Retrieve a list of recipes, populate createdBy and comments
    recipes: async () => {
      return Recipe.find().populate('createdBy').populate('comments.user');
    },

    // Retrieve a recipe by its ID, populate createdBy and comments
    recipe: async (parent, { recipeId }) => {
      return Recipe.findOne({ _id: recipeId }).populate('createdBy').populate('comments.user');
    },

    // Retrieve a list of comments, populate user and recipe
    comments: async () => {
      return Comment.find().populate('user').populate('recipe');
    },

    // Retrieve a comment by its ID, populate user and recipe
    comment: async (parent, { commentId }) => {
      return Comment.findOne({ _id: commentId }).populate('user').populate('recipe');
    },

    // Retrieve the currently authenticated user, populate their recipes
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('recipes');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // Register a new user, create a token for them
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Log in a user, create a token for them
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // Add a new recipe associated with the currently authenticated user
    addRecipe: async (parent, { title, ingredients, instructions }, context) => {
      if (context.user) {
        const recipe = await Recipe.create({
          title,
          ingredients,
          instructions,
          createdBy: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Add a new comment to a recipe
    addComment: async (parent, { recipeId, content }, context) => {
    if (context.user) {
        const comment = await Comment.create({
          content,
          user: context.user._id,
          recipe: recipeId,
        });

        await Recipe.findOneAndUpdate(
          { _id: recipeId },
          { $addToSet: { comments: comment._id } }
        );

        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Remove a recipe owned by the authenticated user
    removeRecipe: async (parent, { recipeId }, context) => {
      if (context.user) {
        const recipe = await Recipe.findOneAndDelete({
          _id: recipeId,
          createdBy: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { recipes: recipe._id } }
        );

        return recipe;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Remove a comment from a recipe
    removeComment: async (parent, { recipeId, commentId }, context) => {
      if (context.user) {
        return Recipe.findOneAndUpdate(
          { _id: recipeId },
          {
            $pull: {
              comments: {
                _id: commentId,
                user: context.user._id,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;