import bcrypt from "bcrypt";

const hashedPassword = async (userPassword) => {
  // define how many salt rounds (make the hasing algorithm)
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(userPassword, salt);
    return hash;
  } catch (error) {
    console.log("error hashing password with bcrypt :>> ", error);
  }
};

// check password for login
// function has to receive 2 inputs: password typed by the user & password in the database (code snippet from bcrypt docu)
const verifyPassword = async (loginPassword, storedPassword) => {
  // bcrypt.compare returns a boolean. true if passwords match, false if they differ
  const verifiedToken = bcrypt.compare(loginPassword, storedPassword);
  return verifiedToken;
};

export { hashedPassword, verifyPassword };
