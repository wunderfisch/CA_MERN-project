import React from "react";

interface CardProps {
  recipe: Recipe;
}

const Card = ({ recipe }: CardProps) => {
  //   const name = props.name;
  //   const description = props.description;
  //   console.log("props :>> ", props);

  return (
    <div>
      <div className="card">
        <div className="cardbody">
          <div className="cardtitle">{recipe.name}Card</div>
          {recipe.description}
        </div>
      </div>
    </div>
  );
};

export default Card;
