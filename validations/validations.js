const User = require("../models/User.model");

const validateUsernameAndEmail = (body) => {
  const errors = [];
  if (
    !body.username ||
    typeof body.username !== "string" ||
    body.username === ""
  ) {
    errors.push("Username is required and must be a string");
  }
  if (!body.email || typeof body.email !== "string" || body.email === "") {
    errors.push("Email is required and must be a string");
  }

  //   const value = await doesUsernameExist(body.username);
  //   if (value === true) errors.push("Username already exist");

  //   const value2 = await validateEmail(body.email);
  //   if (value2 === false) errors.push("Invalid email");

  return errors;
};

const doesUsernameExist = async (username) => {
  try {
    const userObj = await User.findOne({ username: username });
    if (userObj) return true;
    else return false;
  } catch (error) {
    throw error;
  }
};

const validateEmail = (email) => {
  return (
    email.includes("@") && email.includes(".") && typeof email === "string"
  );
};

module.exports = { validateUsernameAndEmail, doesUsernameExist, validateEmail };
