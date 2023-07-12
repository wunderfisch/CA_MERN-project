import React from "react";
import { Link } from "react-router-dom";

type Props = {};

function Navbar({}: Props) {
  return (
    <nav className="navigation">
      <Link to="login" className="navtab">
        Login
      </Link>{" "}
      {""}|{""}
      <Link to="register" className="navtab">
        Register
      </Link>{" "}
      {""}|{""}
      <Link to="/" className="navtab">
        Recipes
      </Link>{" "}
      {""}|{""}
      <Link to="recipies/newRecipe" className="navtab">
        Post new recipes
      </Link>{" "}
      {""}|{""}
      <Link to="profile" className="navtab">
        Profile
      </Link>
    </nav>
  );
}

export default Navbar;
