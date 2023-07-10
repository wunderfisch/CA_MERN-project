import passport from "passport";

// authenticate request
// type of authentication = "jwt"
const jwtAuth = passport.authenticate("jwt", { session: false });
// use it in usersRouter.js --> add to the middle of the route

export default jwtAuth;
