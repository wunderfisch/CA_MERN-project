import express from "express";
import { imageUpload, login, register } from "../controller/userController.js";
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

export default router;
// in index.js import userRoutes
