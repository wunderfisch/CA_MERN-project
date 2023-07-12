import { ChangeEvent, useState } from "react";

const PostRecipe = () => {
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

  const [ingredient, setIngredient] = useState<any>({
    ingredientName: "",
    amount: 0,
    unit: "",
  });
  const [ingredientList, setIngredientList] = useState<Ingredient[]>([
    { ingredientName: "", amount: 0, unit: "" },
  ]);

  const handleIngredientInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name :>> ", e.target.name);
    // const property = (e.target as HTMLInputElement).name;
    // const value = (e.target as HTMLInputElement).value;

    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
    // console.log("ingredient :>> ", ingredient);
  };

  const handleIngredientListInput = () => {
    setIngredientList([...ingredientList, ingredient]);
    console.log("ingredientList :>> ", ingredientList);
  };

  const handleInputChangeRecipe = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const uploadrecipe = async () => {
    setNewRecipe({ ...newRecipe, ingredients: ingredientList });
    console.log("newRecipe :>> ", newRecipe);

    // postman code snippet
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // behaves as if all strings?!
    const urlencoded = new URLSearchParams();
    urlencoded.append("name", newRecipe.name);
    urlencoded.append("likes", newRecipe.likes);
    urlencoded.append("description", newRecipe.description);
    urlencoded.append("ingredients", ingredientList);

    urlencoded.append("category", newRecipe.category);
    urlencoded.append("minutes", newRecipe.minutes);
    urlencoded.append("vegan", newRecipe.vegan);
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
        <div>INGREDIENT: {ingredient.ingredientName}</div>
        <div>
          {" "}
          {/* this should be an object with as many arrays(name, quanitiy, unit) as ingredients */}
          <label htmlFor="ingredients">ingredient</label>
          <input
            type="text"
            name="ingredients"
            id="ingredients"
            onChange={handleIngredientInput}
          />{" "}
          {""}
          <label htmlFor="ingredientquantity">amount</label>
          <input
            type="number"
            name="ingredientquantity"
            id="ingredientquantity"
            onChange={handleIngredientInput}
          />{" "}
          {""}
          <label htmlFor="ingredientunit">unit</label>
          <select
            name="ingredientunit"
            id="ingredientunit"
            onChange={handleIngredientInput}
          >
            <option value="gramms">gramms</option>
            <option value="bags">bags</option>
            <option value="teaspoons">teaspoons</option>
            <option value="tablespoons">tablespoons</option>
            <option value="milliliters">milliliters</option>
            <option value="items">items</option>
            <option value="pinch">pinch</option>
          </select>{" "}
          {/* <button onClick={handleIngredientListInput}>Add to recipe</button> */}
          <button onClick={handleIngredientListInput}>
            Add to list of inggredients
          </button>
        </div>

        {/* does every radio need a own handler or one for all radios? */}
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
        <br></br>

        <label htmlFor="minutes">Minutes</label>
        <input
          type="number"
          name="minutes"
          id="minutes"
          min="1"
          max="1440"
          onChange={handleInputChangeRecipe}
        />

        <label htmlFor="vegan">Is your recipe vegan?</label>
        <input
          type="checkbox"
          name="vegan"
          id="vegan"
          value="true"
          onChange={handleInputChangeRecipe}
        />

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
