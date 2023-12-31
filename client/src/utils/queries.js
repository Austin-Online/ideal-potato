import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    username
    email
    password
    recipes {
      _id
      title
      ingredients
      instructions
      createdBy {
        username
      }
      createdAt
      comments {
        _id
        commentText
        createdAt
        commentAuthor {
          _id
          username
        }
      }
    }
  }
}
`;

export const QUERY_USER = gql`
query User($userId: ID!) {
  user(userId: $userId) {
    _id
    username
    email
    recipes {
      _id
      title
      ingredients
      instructions
      createdAt
      createdBy {
        _id
        username
      }
      comments {
        _id
        createdAt
        commentText
        commentAuthor {
          _id
          username
        }
      }
    }
  }
}
`;
export const QUERY_RECIPES = gql`
query Recipes {
  recipes {
    _id
    title
    ingredients
    instructions
    createdAt
    createdBy {
      _id
      username
    }
    comments {
      _id
      commentText
      commentAuthor {
        username
      }
      createdAt
    }
  }
}
`;

export const QUERY_RECIPE = gql`
query Recipe($recipeId: ID!) {
  recipe(recipeId: $recipeId) {
    _id
    title
    ingredients
    instructions
    createdBy {
      _id
      username
    }
    createdAt
    comments {
      _id
      commentText
      commentAuthor {
        _id
        username
      }
      createdAt
    }
  }
}
`;


export const QUERY_MYRECIPES = gql`
query MyRecipes($userId: ID!) {
  myRecipes(userId: $userId) {
    _id
    title
    instructions
    ingredients
    createdBy {
      username
    }
    createdAt
    comments {
      _id
      commentText
      commentAuthor {
        username
      }
      createdAt
    }
  }
}
`;

export const QUERY_SAVED_RECIPES = gql`
  query savedRecipes($userId: ID!) {
    user(userId: $userId) {
      savedRecipes {
        _id
      }
    }
  }
`;

export const SAVE_RECIPE = gql`
  mutation saveRecipe($recipeId: ID!) {
    saveRecipe(recipeId: $recipeId) {
      _id
    }
  }
`;