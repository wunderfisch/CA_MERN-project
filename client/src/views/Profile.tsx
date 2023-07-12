import React, { useState } from "react";
import getTokenFromLocalStorage from "../utils/getTokenFromLocalStorage";

type Props = {};

const Profile = (props: Props) => {
  const [user, setUser] = useState<User>({
    userName: "",
    email: "",
    avatar: "",
  });

  // error can be a string or null. but initially no error = null
  const [error, setError] = useState<ResponseError>(null);

  const getProfile = async () => {
    //  this function does the same as the postman get user profile request
    // postman gives code snippet
    // generating request with the token in the header. therefore get token from local storage

    const token = getTokenFromLocalStorage();
    if (token) {
      // if we have a token in local storage, do request to backend
      const myHeaders = new Headers();
      myHeaders.append(
        // the header contains a field "Authorization" with a string (Bearer + 1 space + the individual token (therefore use template literals)) as value.
        "Authorization",
        `Bearer ${token}`
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5001/api/users/profile",
          requestOptions
        );
        console.log("response :>> ", response);
        if (response.ok) {
          // result should not be any, therefore interface in index.d.ts (reuse)
          const result: FetchProfileResult = await response.json();
          //  if everything is ok, set User with the info in the field user inside the result
          setUser(result.user);
          // in case there is a previous state set, set error to null when ok
          setError(null);
        } else if (!response.ok && response.status === 401) {
          setError(response.statusText);
        } else {
          // if response is not ok. type for the result being an error is also already existing in index.d.ts
          const result: FetchErrror = await response.json();
          // look in userController.js how called there = error
          setError(result.error);
        }
      } catch (error) {
        console.log("error :>> ", error);
      }
    } else {
      // when no user, display error and set User to empty strings
      setError("please login");
      setUser({
        userName: "",
        email: "",
        avatar: "",
      });
    }
  };

  return (
    <>
      <div className="textcenter">
        <h1>User Profile</h1>

        {/* if there is an error, display it */}
        {error && <h3>{error}</h3>}
        {/* better rather with a use effect than with a button */}
        <button onClick={getProfile}>Display my profile</button>

        {user && (
          <div>
            <p>{user.userName}</p>
            <p>{user.email}</p>
            <div className="avatar">
              <img src={user.avatar} alt="your profile picture" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
