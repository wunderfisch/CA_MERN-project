import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

// function
const issueToken = (userId) => {
  //   console.log("userId :>> ", userId);
  const options = {
    expiresIn: "1d",
    issuer: "martha",
  };

  const payload = {
    sub: userId,
  };

  // in .env file
  const secretOrPrivateKey = process.env.JWT_SECRET;

  // structure of token copied from jwt docu (delete callback; add options) - naming doesn't matter, only order
  const token = jwt.sign(payload, secretOrPrivateKey, options);
  return token;
};

export { issueToken };
