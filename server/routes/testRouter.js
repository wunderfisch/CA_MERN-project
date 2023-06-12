import express from "express";
// store Router from express into variable
const router = express.Router();

// /firstroute is endpoint
router.get("/firstroute", (request, response) => {
  response.send("send this in the first/second response");
  console.log("client did a fetch");
});

export default router;
