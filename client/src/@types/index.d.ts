export interface User {
  userName: string;
  email: string;
  avatar: string;
}

export interface RegisterCredentials {
  userName: string;
  email: string;
  password: string;
  avatar: string;
}

// interface RegisterCredentials extends User {
//   password: string;
// }
export interface FetchFileUpload {
  avatar: string;
}

// still to be done (as with types for login)
export interface FetchRegisterResult {}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type Token = string | null;

export interface FetchLoginResult {
  message: string;
  user: User;
  token: Token;
}

// a result that is an error needs different type than a corrrect result
export interface FetchErrror {
  error: string;
}

export type ResponseError = string | null;

export interface FetchProfileResult {
  user: User;
}

// for posting a recipe
export interface Recipe {
  _id: string;
  name: string;
  likes: number;
  description: string;
  ingredients: Ingredient[];
  category: string;
  minutes: number;
  vegan: boolean;
  wellwith: Array;
}

export interface FetchRecipeResult {
  allRecipes: Recipe[];
}
export interface Ingredient {
  ingredientName: string;
  amount: number;
  unit: string;
}

export type IngredientList = Object | null;
