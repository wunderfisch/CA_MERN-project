import React, { ChangeEvent, FormEvent, useState } from "react";

type Props = {};
interface User {
  userName: string;
  email: string;
  password: string;
  avatar: string;
}

const Register = (props: Props) => {
  // selected file is what the user uploads
  // useState will mostly be of the special type File but can also be a string. Initialized as empty string
  const [selectedFile, setSelectedFile] = useState<File | string>("");

  // variable that stores the values of the new user
  // newUser is of type User defined in the interface above
  // initial state has to be defined
  const [newUser, setNewUser] = useState<User>({
    userName: "",
    emgail: "",
    password: "",
    avatar: "",
  });

  // the event has to be assigned a type
  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    // inside event there is a field "target" with field "files". on position 0 is information on the uploaded file
    // typescript complains because e.target.files[0] can have info or it could be empty. to conditionally check in a way tsx accepts: ?.
    console.log("event.target.files?.[0] :>> ", e.target.files?.[0]);
    // file can be eighter e.tar... or a empty string as defined above
    const file = e.target.files?.[0] || "";
    // setselectedFile does not accept e.target.files?.[0] directly because it does not accept "", so const file is needed
    setSelectedFile(file);
  };

  // to prevent that the page always refreshes when button is clicked (without sending) the event has to be passed into the funtion and used like this: e.preventDefault
  // the event as above has to match with typescript
  const submitPicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check the code postman provides in the code snippet for the post request
    // 1:15:30
    // vite wants const instead of var
    const formdata = new FormData();
    // "image" has to match the name in our middleware. in image will travel selectedFile.
    formdata.append("image", selectedFile);

    const requestOptions = {
      // method GET is default, so POST has to be written
      method: "POST",
      body: formdata,
    };

    // transform the fetch into a async
    try {
      const response = await fetch(
        "http://localhost:5001/api/users/imageUpload",
        requestOptions
      );
      // check if response is ok (has a field "ok" that is a boolean)
      if (response.ok) {
        const result = await response.json();
        // go to newUser and append new information with the spread operator, for now only for the avatar field
        setNewUser({ ...newUser, avatar: result.avatar });
        console.log("result :>> ", result);
      }
    } catch (error) {
      console.log("error uploading picture :>> ", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <form onSubmit={submitPicture}>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleAttachFile}
          />
          {/* send to cloudinary */}
          <button type="submit">upload picture</button>
        </form>
      </div>
      <div>Your Information</div>
      {/* if there is a newUser, display what is written in newUser.avatar */}
      {newUser && (
        <div>
          <img
            src={newUser.avatar}
            alt="picture you uploaded"
            className="avatar"
          />
        </div>
      )}
    </div>
  );
};

export default Register;
