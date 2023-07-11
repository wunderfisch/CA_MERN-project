import { useState } from "react";

type Props = {};

const PostRecipe = (props: Props) => {
  console.log("asdadad");
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    name: "",
    likes: 0,
    description: "",
    ingredients: {},
    category: "",
    minutes: 0,
    vegan: false,
    wellwith: [],
  });

  const handleInputChangeRecipe = (e: ChangeEvent<HTMLInputElement>) => {
    setNewRecipe({ ...newRecipe, [e.target.name]: e.target.value });
  };

  const uploadrecipe = async () => {
    console.log("newRecipe :>> ", newRecipe);

    // postman code snippet
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // behaves as if all strings?!
    const urlencoded = new URLSearchParams();
    urlencoded.append("name", newRecipe.name);
    urlencoded.append("likes", newRecipe.likes);
    urlencoded.append("description", newRecipe.description);
    urlencoded.append("ingredients", newRecipe.ingredients);
    urlencoded.append("category", newRecipe.category);
    urlencoded.append("minutes", newRecipe.minutes);
    urlencoded.append("vegan", newRecipe.vegan);
    urlencoded.append("wellwith", "648c7180c0b43a4a8fa0db77");

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

        {/* this should be an object with as many arrays(name, quanitiy, unit) as ingredients */}
        <label htmlFor="ingredients">which ingredients are needed</label>
        <input
          type="text"
          name="ingredients"
          id="ingredients"
          onChange={handleInputChangeRecipe}
        />

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
