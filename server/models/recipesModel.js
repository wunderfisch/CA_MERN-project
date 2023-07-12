import mongoose from "mongoose";

// create schema

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  likes: {
    type: Number,
    required: false,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: Array,
    required: false,
  },
  category: {
    type: String,
  },
  minutes: {
    type: Number,
  },
  vegan: {
    type: Boolean,
  },
  // populate. documentation from mongoose requires. ref is the name of the collection which fields we want to display inside another
  // go to recipeContoller.js and add .populate({path: "wellwith"})
  wellwith: [{ type: mongoose.Schema.Types.ObjectId, ref: "drink" }],
});

// to which database this model should be applied? put the collection name in singular! mongoose uses dictionary and knows that it belongs to the recipeS collection
const recipesModel = mongoose.model("recipe", recipeSchema);
// has to be transformed to a model for a specific collection
// recipeSchema is a model for the collection of documents recipes
// could be reused for different collections

// model needs to be exported to use it elsewhere
export default recipesModel;
