import express from "express";
import {
  getAllRecipes,
  getRecipesByCategory,
  postRecipe,
} from "../controller/recipesController.js";
import recipesModel from "../models/recipesModel.js";
const router = express.Router();

// get-method from router and define
// all is new endpoint
router.get("/all", getAllRecipes);
router.get("/:category", getRecipesByCategory);

// all of the following used to be in the router.get(/all) function. is now in the recipesController and I only import the getAllRecipes function from there
// async (request, response) => {
//   //   console.log("this should be the all recipes request");
//   //tells mongoose to look at the model, go to database (recipesapp) and look at collection (recipes), find all documents and show in clg
//   const allRecipes = await recipesModel.find({});
//   // now define what to send back to frontend
//   response.status(200).json({
//     allRecipes,
//     // show how many items are in the response
//     number: allRecipes.length,
//     // more things can be send
//     message: "this are all recipes",
//   });
//    console.log("allRecipes :>> ", allRecipes);
//   //   console.log("response.data :>> ", response.data);
// }

//route for posting a recipe
router.post("/postrecipe", postRecipe);

export default router;
