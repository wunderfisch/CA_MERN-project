import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Register from "./views/Register";
import Login from "./views/Login";
import Profile from "./views/Profile";

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
      <h2>Recipes App</h2>
      <Register />
      <hr />
      <Login />
      <hr />
      <Profile />
    </>
  );
}

export default App;
