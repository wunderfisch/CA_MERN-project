import drinksModel from "../models/drinksModel.js";
// add .js

const getAllDrinks = async (request, response) => {
  try {
    const allDrinks = await drinksModel.find({});
    response.status(200).json({
      allDrinks,
      number: allDrinks.length,
    });
  } catch (error) {
    console.log("error :>> ", error);
    response.status(500).json({
      message: "Error. with all drinks.",
    });
  }
};

export { getAllDrinks };
