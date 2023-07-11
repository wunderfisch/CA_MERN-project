import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";
import PostRecipe from "./views/PostRecipe";
import DisplayRecipes from "./views/DisplayRecipes";

import { Routes, Route } from "react-router-dom";
import NoMatch from "./views/NoMatch";
import Navbar from "./components/Navbar";

function App() {
  //   const [count, setCount] = useState(0);

  //   fetching data
  //   const getRecipes = async (params: type) => {
  //     const response = await fetch("http://localhost:5001/api/recipes/all");
  //     const data = await response.json();
  //     console.log("data :>> ", data);
  //   };

  //   useEffect(() => {
  //     getRecipes();
  //   }, []);

  return (
    <>
      <Navbar />
      <h2>Recipes App</h2>
      <Routes>
        <Route path="/" element={<DisplayRecipes />} />
        <Route path="/recipies/newRecipe" element={<PostRecipe />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
