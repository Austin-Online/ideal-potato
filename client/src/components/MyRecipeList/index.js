import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/recipeRandom.css'

const MyRecipeList = ({ recipes, handleRemoveRecipe, authService }) => {
  return (
    <div>
      {recipes.length === 0 ? (
        <div>No recipes yet.</div>
      ) : (
        <div>
          {recipes.map(recipe => (
            <div key={recipe._id} className="card mb-3">
              <h4 className="titleBox p-2 m-0">
                Created by {recipe.createdBy.username} <br />
                <span style={{ fontSize: '1rem' }}>
                  Created on {recipe.createdAt}
                </span>
              </h4>
              <div className="card-body contentBox p-2">
                <h5>{recipe.title}</h5>
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                <p>Instructions: {recipe.instructions}</p>
              </div>
              <Link
                className="btn buttonLink btn-block btn-squared"
                to={`/recipes/${recipe._id}`}
              >
                View Recipe Details
              </Link>
              {recipe.createdBy._id === authService.getUserId() && (
                <button
                  className="btn btn-dark btn-block btn-squared"
                  onClick={() => handleRemoveRecipe(recipe._id)}
                >
                  Remove Recipe
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipeList;
