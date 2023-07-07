import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose, { connect } from "mongoose";
import passport from "passport";

import cloudinaryConfig from "./config/cloudinary.js";
import passportStrategy from "./config/passportConfig.js";

import testRouter from "./routes/testRouter.js";
import recipesRouter from "./routes/recipesRouter.js";
import drinksRouter from "./routes/drinksRouter.js";
import userRouter from "./routes/userRouter.js";
// add .js manually

import multerUpload from "./middleware/multer.js";

const app = express();

// moved to testRouter.js
// const router = express.Router();

const addMiddelwares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
  passportStrategy(passport);
};

const startServer = () => {
  const port = process.env.PORT || 5001;

  // function to start the server, it starts listening to the port
  app.listen(port, () => {
    console.log("Server is running on port" + port);
    console.log("and this as well");
    console.log("and this as well 2");
  });
};

const connectMongoDB = async () => {
  await mongoose.connect(process.env.DB);
  console.log("MonogoDB is running connected");
};

const loadRoutes = () => {
  app.use("/test", testRouter);
  // create different base urls to make the url look properly
  app.use("/api/recipes", recipesRouter);
  app.use("/api/drinks", drinksRouter);
  app.use("/api/users", userRouter);
};

// rewrite since parts of the routing put to testRouter.js// /test is base url
// app.use("/test", router);

// // /firstroute is endpoint - moved to testRouter.js
// router.get("/firstroute", (request, response) => {
//   response.send("send this in the first response");
//   console.log("client did a fetch");
// });

// create controller function that decides in which order the other functions are called
// this is an IIFE = Immediately invoked function expression (function to be executed)()
(async function controller() {
  await connectMongoDB();
  addMiddelwares();
  loadRoutes();
  startServer();
})();
