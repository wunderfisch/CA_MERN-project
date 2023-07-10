import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import getTokenFromLocalStorage from "../utils/getTokenFromLocalStorage";

type Props = {};
// type for loginCredentials in index.d.ts

const Login = (props: Props) => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    // both empty strings at the beginning
    email: "",
    password: "",
  });

  // following should better be done in a context
  // user has to be typed but can also be null (after logout)
  const [user, setUser] = useState<User | null>({
    userName: "",
    email: "",
    avatar: "",
  });

  // error handling
  // best the error starts as null so nothing is shown in the frontend
  const [error, setError] = useState<ResponseError>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setLoginCredentials to what it was before + add e.target.value
    // console.log("e.target.name :>> ", e.target.name);
    // console.log("e.target.value :>> ", e.target.value);
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("loginCredentials :>> ", loginCredentials);
    // send request to backend very alike the code snippet from postman login request
    // in header we define which data is send where
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials.email);
    urlencoded.append("password", loginCredentials.password);

    const requestOptions = {
      method: "POST",
      headers: myHeader,
      body: urlencoded,
      //   redirect: 'follow' should be default but creates an error
    };

    // make fetch a try-catch with url and requestOptions
    try {
      const response = await fetch(
        "http://localhost:5001/api/users/login",
        requestOptions
      );
      console.log("response :>> ", response);

      // if response is positiv transform response to json
      if (response.ok) {
        // result is of type FetchLoginResult as defined in index.d.ts
        const result: FetchLoginResult = await response.json();
        // typing can also be written like:
        // const result = (await response.json()) as FetchLoginResult;
        // in result.token is the token
        const { token, user, message } = result;
        // store token in the local storage of the browser with
        //   localStorage.setItem + key(name "token")-value(token) pair
        // local storage can be seen in the browser in developer tools  --> Application
        // as long as the token is stored in local storage the user is logged in
        //check if token is there
        if (token) {
          localStorage.setItem("token", token);
          //  setUser after doing the type
          setUser(result.user);
        }

        console.log("result :>> ", result);
      }
      if (!response.ok) {
        // (response.status === 404) // if only 404 otherwise more status codes
        const result: FetchErrror = await response.json();
        setError(result.error);
        //
      }
    } catch (error) {
      console.log("error during login :>> ", error);
    }
  };

  // function in utils/checkUserStatus.tsx now because DRY and needed also to display Profile
  // const checkUserStatus = () => {
  //   // method localStorage has few options, they can be chosen when putting the .
  //   //- here we want to get the item named "token"
  //   const token = localStorage.getItem("token");
  //   // check if there is a token
  //   // this info should best be in context so all components know
  //   if (token) {
  //     console.log("user is logged in");
  //   } else {
  //     console.log("user is not logged in");
  //   }
  // };

  // function deletes the token from the local storage
  const logout = () => {
    localStorage.removeItem("token");
    // after loggin out user should be set to null, therefore it can't just be of type string
    setUser(null);
  };

  // everytime there is an interaction with the user, check the status
  useEffect(() => {
    getTokenFromLocalStorage();
  }, [user]);

  return (
    <div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <h1>Login</h1>
      {error && <h2>{error}</h2>}
      <div>
        <form onSubmit={submitLogin} className="inputfields">
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            id="loginemail"
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="loginpassword"
            onChange={handleInputChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
