import React, { useEffect, useState } from "react";
import {
  FetchErrror,
  FetchRecipeResult,
  Recipe,
  ResponseError,
} from "../@types";
import Card from "../components/Card";

type Props = {};

const DisplayRecipes = (props: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      _id: "",
      name: "",
      likes: 0,
      description: "",
      ingredients: [],
      category: "",
      minutes: 0,
      vegan: false,
      wellwith: [],
    },
  ]);

  const [error, setError] = useState<ResponseError>(null);

  const getRecipes = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/recipes/all",
        requestOptions
      );
      // console.log("response :>> ", response);
      if (response.ok) {
        const result: FetchRecipeResult = await response.json();
        // console.log("result :>> ", result);
        setRecipes(result.allRecipes);
        setError(null);
      } else if (!response.ok && response.status === 401) {
        setError(response.statusText);
      } else {
        const result: FetchErrror = await response.json();
        setError(result.error);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <h2>DisplayRecipes</h2>
      <div className="cardgrid">
        {error && <h3>{error}</h3>}
        {recipes &&
          recipes.map((recipe) => {
            return (
              <div key={recipe._id}>
                <Card recipe={recipe} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default DisplayRecipes;
