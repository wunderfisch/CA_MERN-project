import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/usersModel.js";
//   add .js
// import * as dotenv from "dotenv";
// dotenv.config();

// rewrite the following from docu to become the import (pre ES6 method):
//  var JwtStrategy = require("passport-jwt").Strategy,

// to test if working, delete before deploying
// console.log("process.env.JWT_SECRET :>> ", process.env.JWT_SECRET);

// options say: go inside the request coming from the client, go to header and look for the token; secretOrKey sends signatur of token
var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// ! since findOne doesn't accept a callback function anymore the jwtStrategy needs to be turned to async
// the strategy: does what options say, if we have token, the payload of the token will be passed into the argument of function
const jwtStrategy = new JwtStrategy(options, async function (
  jwt_payload,
  done
) {
  try {
    // jwt_payload.sub is the id of the user
    // inside MongoDB find the right user with id encoded in the token
    // if success, do function with user
    const user = await userModel.findOne({ _id: jwt_payload.sub });

    if (user) {
      // user is there
      console.log("the token is correct");
      return done(null, user);
    } else {
      // no one in DB with that id
      console.log("no user in the database");
      return done(null, false);
      // or you could create a new account
    }
  } catch (error) {
    return done(error, false);
  }

  // );
});

// tell passport to use the jwtStrategy
const passportStrategy = (passport) => {
  passport.use(jwtStrategy);
};

// needs to be loaded as middelware --> index.js --> addMiddelwares
export default passportStrategy;
