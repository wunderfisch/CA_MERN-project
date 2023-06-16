import express from "express";
import { getAllDrinks } from "../controller/drinksContoller.js";
// add .js
const router = express.Router();

// creat route inside drink routes --> "/all"
// after(otherwise error) exporting and importing/ using in index.js, call function getAllDrinks that will get us all drinks
// only after drinksController.js with getAllDrinks is created it can be imported here
router.get("/all", getAllDrinks);

// in express always ONLY export the router!
export default router;
