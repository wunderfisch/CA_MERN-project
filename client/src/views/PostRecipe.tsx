import { ChangeEvent, useState } from "react";
import { Ingredient, Recipe } from "../@types";

const PostRecipe = () => {
  // const [newRecipe, setNewRecipe] = useState<Recipe>({
  //   _id: "",
  //   name: "",
  //   likes: 0,
  //   description: "",
  //   ingredients: [],
  //   category: "",
  //   minutes: 0,
  //   vegan: false,
  //   wellwith: [],
  // });name]: e.target.value });
  // console.log("ingredient :>>
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    _id: "",
    name: "",
    likes: 0,
    description: "",
    ingredients: [],
    category: "",
    minutes: 0,
    vegan: false,
    wellwith: [],
  });

  // const [ingredient, setIngredient] = useState<any>({
  //   ingredientName: "",
  //   amount: 0,
  //   unit: "",
  // });
  const [ingredient, setIngredient] = useState<any>({});
  // const [ingredientList, setIngredientList] = useState<
  //   Ingredient[]
  //   // | null
  // >(
  //   // null
  //   [{ ingredientName: "", amount: 0, unit: "" }]
  // );

  // const [ingredientList, setIngredientList] = useState<
  //   Ingredient[]
  //   // | null
  // >(
  //   // null
  //   []
  // );

  const [ingredientList, setIngredientList] = useState<Ingredient[] | null>(
    null
  );

  const handleIngredientInput = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    console.log("e.target.name :>> ", e);
    // const property = (e.target as HTMLInputElement).name;
    // const value = (e.target as HTMLInputElement).value;
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
    // console.log("ingredient :>> ", ingredient);
  };

  const handleIngredientListInput = (e: MouseEvent) => {
    const selectValue = document.querySelector("select")?.value;
    console.log("selectArray :>> ", selectValue);
    if (selectValue === "no-value") {
      alert("pick one");
    }
    setIngredientList([...(ingredientList || []), ingredient]);
    console.log("ingredientList :>> ", ingredientList);
  };

  const handleInputChangeRecipe = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const uploadrecipe = async () => {
    // setNewRecipe({ ...newRecipe, ingredients: ingredientList });
    console.log("newRecipe :>> ", newRecipe);

    // first stringify the array
    const ingredientsListToApped = JSON.stringify(ingredientList);
    // console.log("ingredientsListToApped :>> ", ingredientsListToApped);
    console.log("ingredientList :>> ", ingredientList);

    // postman code snippet
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // behaves as if all strings?!
    const urlencoded = new URLSearchParams();
    urlencoded.append("name", newRecipe.name);
    urlencoded.append("likes", JSON.stringify(newRecipe.likes));
    urlencoded.append("description", newRecipe.description);

    // array can't be appended, has to be converted to a string before sent to backend
    urlencoded.append("ingredients", ingredientsListToApped);
    urlencoded.append("category", newRecipe.category);
    urlencoded.append("minutes", JSON.stringify(newRecipe.minutes));
    urlencoded.append("vegan", JSON.stringify(newRecipe.vegan));
    // set hard coded for now - later possibilty to pick drinks (populate)
    urlencoded.append("wellwith", "648c7180c0b43a4a8fa0db77");
    console.log(
      'urlencoded.get("ingredients) :>> ',
      urlencoded.get("ingredients")
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      //   redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/recipes/postrecipe",
        requestOptions
      );
      const result = await response.json();
      console.log("result :>> ", result);
    } catch (error) {
      console.log("error with postrecipes 123:>> ", error);
    }
  };

  return (
    <>
      <h2>Post a new recipe</h2>
      <div className="inputfields">
        <label htmlFor="name">name of recipe</label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleInputChangeRecipe}
        />

        {/* likes just stay default 0 */}

        <label htmlFor="description">how to prepare your dish</label>
        <input
          type="text"
          name="description"
          id="description"
          onChange={handleInputChangeRecipe}
        />
        <div>
          {/* display already posted ingredients here */}
          Ingredients:
          <div>
            {ingredientList &&
              ingredientList.map((ingredient, index) => {
                return (
                  <div key={index} className="displayaddedingredient">
                    <div className="ingredientitem">
                      {ingredient.ingredientName}{" "}
                    </div>
                    <div className="ingredientitem">{ingredient.amount} </div>
                    <div className="ingredientitem">{ingredient.unit}</div>
                  </div>
                );
              })}
          </div>
        </div>
        <div>
          {" "}
          {/* this should be an object with as many arrays(name, quanitiy, unit) as ingredients */}
          <label htmlFor="ingredientName">ingredient</label>{" "}
          <input
            type="text"
            name="ingredientName"
            id="ingredientName"
            onChange={handleIngredientInput}
          />{" "}
          {""}
          <label htmlFor="amount">amount</label>{" "}
          <input
            type="number"
            name="amount"
            id="amount"
            onChange={handleIngredientInput}
          />{" "}
          {""}
          <label htmlFor="unit">unit</label>{" "}
          <select
            name="unit"
            id="unit"
            onChange={handleIngredientInput}
            defaultValue={"no-value"}
          >
            <option value="no-value" disabled selected>
              {" "}
              pick one
            </option>
            <option value="gramms">gramms</option>
            <option value="bags">bags</option>
            <option value="teaspoons">teaspoons</option>
            <option value="tablespoons">tablespoons</option>
            <option value="milliliters">milliliters</option>
            <option value="items">items</option>
            <option value="pinch">pinch</option>
          </select>{" "}
          {/* <button onClick={handleIngredientListInput}>Add to recipe</button> */}
          <button
            onClick={handleIngredientListInput}
            //  value="Reset form"
          >
            Add to list of ingredients
          </button>
        </div>

        {/* radio group detected by name*/}

        <form>
          {" "}
          <label htmlFor="fry">fry</label>
          <input
            type="radio"
            name="category"
            id="fry"
            value="fry"
            onChange={handleInputChangeRecipe}
          />
          <br></br>
          <label htmlFor="bake">bake</label>
          <input
            type="radio"
            name="category"
            id="bake"
            value="bake"
            onChange={handleInputChangeRecipe}
          />
          <br></br>
          <label htmlFor="cook">cook</label>
          <input
            type="radio"
            name="category"
            id="cook"
            value="cook"
            onChange={handleInputChangeRecipe}
          />
          <br></br>
          <label htmlFor="cold">cold</label>
          <input
            type="radio"
            name="category"
            id="cold"
            value="cold"
            onChange={handleInputChangeRecipe}
          />
        </form>
        <div>
          <label htmlFor="minutes">Minutes</label>{" "}
          <input
            type="number"
            name="minutes"
            id="minutes"
            min="1"
            max="1440"
            onChange={handleInputChangeRecipe}
          />
        </div>
        <div>
          <label htmlFor="vegan">Is your recipe vegan?</label>{" "}
          <input
            type="checkbox"
            name="vegan"
            id="vegan"
            value="true"
            onChange={(e) => handleInputChangeRecipe(e)}
          />
        </div>

        {/* <p>Which drink fits to your recipe?</p>
        <label for="orangejuice">orange juice</label>
        <input
          type="checkbox"
          id="orangejuice"
          name="orangejuice"
          value="648c73fcbb035041bb70da3d"
        />
        <label for="hotwine">hot wine</label>
        <input type="checkbox" id="hotwine" name="hotwine" value="hotwine" />
        <label for="water">water</label>
        <input type="checkbox" id="water" name="water" value="water" />
        <label for="lupincoffee">lupin coffee</label>
        <input
          type="checkbox"
          id="lupincoffee"
          name="lupincoffee"
          value="lupincoffee"
        />
        <label for="schokoslushy">slushy schokolade oat milk</label>
        <input
          type="checkbox"
          id="schokoslushy"
          name="schokoslushy"
          value="schokoslushy"
        /> */}

        <div>
          <button onClick={uploadrecipe}>upload your recipe</button>
        </div>
      </div>
    </>
  );
};

export default PostRecipe;
