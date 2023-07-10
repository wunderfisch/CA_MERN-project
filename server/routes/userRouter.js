import express from "express";
import {
  getProfile,
  imageUpload,
  login,
  register,
} from "../controller/userController.js";
import jwtAuth from "../middleware/jwtAuth.js";
import multerUpload from "../middleware/multer.js";
const router = express.Router();

// type of route is post, because we send info to backand
// define endpoint
// when reacing that endpoint trigger function (error when saving without having created)
router.post("/imageUpload", multerUpload.single("image"), imageUpload);
// multerUpload.single only allows to upload one file at a time. in "" the name to where the image will travel

router.post("/register", register);
// function in userController.js

router.post("/login", login);
// function in userController.js

// route where user can see own information, function in userController.js
// middleware works like this: 1. request arrives at /profile, 2. middleware handles the request in jwtAuth.js, 3. request continues to getProfile function
router.get("/profile", jwtAuth, getProfile);

export default router;
// in index.js import userRoutes
