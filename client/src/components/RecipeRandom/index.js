import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/recipeRandom.css'

const RecipeRandom = ({
    recipes,
    title,
    showTitle = true,
    showUsername = true,
  }) => {
    if (!recipes.length) {
      return <h3>No Recipes Yet</h3>;
    }
  
    // Choose a random recipe index
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIndex];
  
    return (
      <div>
        {showTitle && <h3>{title}</h3>}
        <div key={randomRecipe._id} className="card mb-3">
          <h4 className=" titleBox p-2 m-0">
            {showUsername ? (
              <Link
                className="text-light"
                to={`/recipes/${randomRecipe._id}`}
              >
                Created by {randomRecipe.createdBy.username} <br />
                <span style={{ fontSize: '1rem' }}>
                  Created on {randomRecipe.createdAt}
                </span>
              </Link>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  Created on {randomRecipe.createdAt}
                </span>
              </>
            )}
          </h4>
          <div className="card-body contentBox p-2">
            <h5>{randomRecipe.title}</h5>
            <p>Ingredients: {randomRecipe.ingredients.join(', ')}</p>
            <p>Instructions: {randomRecipe.instructions}</p>
          </div>
          <Link
            className="btn buttonLink btn-block btn-squared"
            to={`/recipes/${randomRecipe._id}`}
          >
            View Recipe Details
          </Link>
        </div>
      </div>
    );
  };
  
  export default RecipeRandom;
  