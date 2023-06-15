import { request, response } from "express";
import recipesModel from "../models/recipesModel.js";

const getAllRecipes = async (request, response) => {
  //   console.log("this should be the all recipes request");

  //tells mongoose to look at the model, go to database (recipesapp) and look at collection (recipes), find all documents and show in clg
  // .find is an async function from mongoose, they defined it
  const allRecipes = await recipesModel.find({});

  // now define what to send back to frontend
  response.status(200).json({
    allRecipes,
    // show how many items are in the response
    number: allRecipes.length,
    // more things can be send
    message: "this are all recipes",
  });

  console.log("allRecipes :>> ", allRecipes);
  //   console.log("response.data :>> ", response.data);
};

const getRecipesByCategory = async (request, response) => {
  // console.log("request.params :>> ", request.params);
  // console.log("request :>> ", request);

  // not destructured
  // const category = request.params.category;
  // or the same but destructured
  const { category } = request.params;
  const { likes } = request.query;
  console.log("likes :>> ", likes);

  // if there is something in the field request.query.likes execute the following
  if (likes) {
    try {
      const recipesWithCategoryAndLikes = await recipesModel.find({
        category: category,
        likes: { $gte: likes },
      });
      if (recipesWithCategoryAndLikes.length === 0) {
        response.status(200).json({
          message: "no recipes with this number of likes in this category",
        });
      } else {
        response.status(200).json({
          recipesWithCategoryAndLikes,
          number: recipesWithCategoryAndLikes.length,
        });
      }
    } catch (error) {
      console.log("error :>> ", error);
      response.status(500).json({
        message:
          "A error happend when fetching recipes with a minimum of likes.",
      });
    }
  }
  // if there are no likes do else
  else {
    // when using await a try-and-catch block is needed to catch the errors
    try {
      // with recipesModel go to collection and there find the category that is equal to what is send in the url
      const requestedRecipes = await recipesModel.find({
        // not well to read: 1. category = keyword, 2. category is the destructured from above
        category: category,
      });
      // console.log("requestedRecipes :>> ", requestedRecipes);
      // if request does not match any data
      if (requestedRecipes.length === 0) {
        response.status(200).json({
          message: "Sorry. There is no recipe with this category available.",
        });
      } else {
        response.status(200).json({
          requestedRecipes,
          number: requestedRecipes.length,
        });
      }
    } catch (error) {
      console.log("error while getting recipes by category :>> ", error);
      // to inform frontend/ user about error:
      // 400: Bad Request. The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
      // 500: Internal Server Error. The server has encountered a situation it does not know how to handle.

      response.status(400).json({
        message: "Error. This category does not exist.",
      });
    }
  }
};

// not export default because later more functions need to be exported from here
export { getAllRecipes, getRecipesByCategory };
