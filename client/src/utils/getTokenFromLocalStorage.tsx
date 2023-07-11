// earlier called checkUserStatus.tsx

const getTokenFromLocalStorage = () => {
  // method localStorage has few options, they can be chosen when putting the .
  //- here we want to get the item named "token"
  // change type of Token to string or null
  const token: Token = localStorage.getItem("token");
  // check if there is a token
  // this info should best be in context so all components know
  if (token) {
    console.log("user is logged in");
    return token;
  } else {
    // if there is no token
    console.log("user is not logged in");

    return null;
  }
};

export default getTokenFromLocalStorage;
