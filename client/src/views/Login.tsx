import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Props = {};
// type for loginCredentials
interface LoginCredentials {
  email: string;
  password: string;
}

const Login = (props: Props) => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    // both empty strings at the beginning
    email: "",
    password: "",
  });
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
        const result = await response.json();
        // in result.token is the token
        const { token, user, message } = result;
        // store token in the local storage of the browser with localStorage.setItem + key(name "token")-value(token) pair
        // local storage can be seen in the browser in developer tools  --> Application
        // as long as the token is stored in local storage the user is logged in
        //check if token is there
        if (token) {
          localStorage.setItem("token", token);
        } else {
          // no token
        }

        console.log("result :>> ", result);
      }
    } catch (error) {
      console.log("error during login :>> ", error);
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = () => {
    // method localStorage has few options, they can be chosen when putting the . - here we want to get the item named "token"
    const token = localStorage.getItem("token");
    // check if there is a token
    // this info should best be in context so all components know
    if (token) {
      console.log("user is logged in");
    } else {
      console.log("user is not logged in");
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
