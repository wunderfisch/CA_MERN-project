interface RegisterCredentials {
  userName: string;
  email: string;
  password: string;
  avatar: string;
}

interface FetchFileUpload {
  avatar: string;
}

// still to be done (as with types for login)
interface FetchRegisterResult {}

interface User {
  userName: string;
  email: string;
  avatar: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// token could also be null, define later
type Token = string | null;

interface FetchLoginResult {
  message: string;
  user: User;
  token: Token;
}

// a result that is an error needs different type than a corrrect result
interface FetchErrror {
  error: string;
}

type ResponseError = string | null;

interface FetchProfileResult {
  user: User;
}

// for posting a recipe
interface Recipe {
  _id: string;
  name: string;
  likes: number;
  description: string;
  ingredients: Object;
  category: string;
  minutes: number;
  vegan: boolean;
  wellwith: Array;
}

interface FetchRecipeResult {
  allRecipes: Recipe[];
}
