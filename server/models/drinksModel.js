import mongoose from "mongoose";

const drinksSchema = new mongoose.Schema({
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
  hot: {
    type: Boolean,
    required: false,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
});

// collection name in singular
const drinksModel = mongoose.model("drink", drinksSchema);

export default drinksModel;
