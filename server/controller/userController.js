import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import { hashedPassword } from "../utils/encryptPassword.js";
// remember to add .js

const imageUpload = async (req, res) => {
  // console.log("req :>> ", req);

  // Upload file to cloudinary
  // make sure there is a file
  if (req.file) {
    try {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "recipesapp",
      });
      // console.log("uploadImage :>> ", uploadImage);
      res.status(201).json({
        message: "Your picture was uploaded successfully.",
        avatar: uploadImage.url,
      });
    } catch (error) {
      console.log("error with file upload:>> ", error);
    }
  } else {
    res.status(415).json({
      message: "Unsupported media type. This file type can't be accepted.",
    });
  }
};

// function called in userRouter.js
const register = async (req, res) => {
  // info will be in field body of the req
  console.log("req.body :>> ", req.body);
  // const {email} = req.body // destructuring is also possible to be used in the variable existingUser
  // first check if user is already registered in database
  try {
    // find our user with method in mongoose docu --> queries --> findOne - because user email needs to be unique only One, also One just finds the first instance of a given word
    // define the field you want to check (could also be destructured)

    const existingUser = await userModel.findOne({ email: req.body.email });
    console.log("existingUser :>> ", existingUser);
    // req huge object. through url could have params or querry. if we do post request there will be info in the body (= from postman)

    // if user is NOT yet existing we want to save it to the DB with using the model
    if (!existingUser) {
      // before creating the user the password has to be hashed
      try {
        // use hashedPassword function from encryptPassword.js
        const encryptedPassword = await hashedPassword(req.body.password);
        console.log("encryptedPassword :>> ", encryptedPassword);

        // only create user if password hashing is successfull = existing
        if (encryptedPassword) {
          // create variable
          const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: encryptedPassword,
            avatar: req.body.avatar,
          });
          //save the user
          // save variable with mongoose method .save to MongoDB (send from postman)
          const savedUser = await newUser.save();
          console.log("savedUser :>> ", savedUser);
          // send response could have any message, but here decided for actual user info
          res.status(201).json({
            user: {
              userName: savedUser.userName,
              email: savedUser.email,
              avatar: savedUser.avatar,
            },
          });
        } else {
          console.log("error hashing password :>> ", error);
          res.status(500).json({
            message: "hashing the password did not work",
          });
        }
      } catch (error) {
        console.log("error saving user :>> ", error);
        res.status(500).json({
          message: "error saving user",
        });
      }
    } else {
      // status code should show that there is something in the DB but is not matching, or somehow else saving is not possible.
      // maybe 412 Precondition Failed or 417 Expectation Failed
      res.status(200).json({
        message: "this email is already registered",
      });
    }
  } catch (error) {}
};

export { imageUpload, register };
