import recipesModel from "../models/recipesModel.js";

const getAllRecipies = async (request, response) => {
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

// not export default because later more functions need to be exported from here
export { getAllRecipies };
