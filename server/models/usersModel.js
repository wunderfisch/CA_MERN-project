import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: false,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: false,
  },
  avatar: {
    type: String,
    require: false,
    unique: false,
  },
});

// transform the schema into a model
// collection in mongoose must be referenced as singular
// in MogoDB it is plural users
const userModel = mongoose.model("user", userSchema);

export default userModel;
