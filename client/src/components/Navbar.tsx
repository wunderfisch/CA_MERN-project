import React from "react";
import { Link } from "react-router-dom";

type Props = {};

function Navbar({}: Props) {
  return (
    <nav>
      <Link to="login">Login</Link> <Link to="register">Register</Link>{" "}
      <Link to="/">Recipes</Link> <Link to="profile">Profile</Link>
    </nav>
  );
}

export default Navbar;
