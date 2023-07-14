import React from "react";
import { Ingredient, Recipe } from "../@types";

interface CardProps {
  recipe: Recipe;
}

const Card = ({ recipe }: CardProps) => {
  return (
    <div>
      <div className="card">
        <div className="cardbody">
          <div className="box">
            <div className="cardtitle">{recipe.name}</div>
            <div className="category">{recipe.category}</div>
            <div className="minutes">{recipe.minutes} Minutes</div>
          </div>
          <div className="description">{recipe.description}</div>
          <p className="youneed">You need:</p>
          <div className="ingredientsbox">
            {recipe &&
              recipe.ingredients.map((ingredient: Ingredient) => {
                return (
                  <div key={ingredient._id}>
                    <div className="ingredients">
                      <div className="ingredient">{ingredient.amount} </div>
                      <div className="ingredient">{ingredient.unit} </div>
                      <div className="ingredient">
                        {ingredient.ingredientName}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* if (recipe.vegan) {<div className="vegan">{vegan}</div>} */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
