const User = require("../models/User.model");

const validateUsername = (body) => {
  const errors = [];
  if (
    !body.username ||
    typeof body.username !== "string" ||
    body.username === ""
  ) {
    errors.push("Username is required and must be a string");
  }
  // if (!body.email || typeof body.email !== "string" || body.email === "") {
  //   errors.push("Email is required and must be a string");
  // }

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

// const validateEmail = (email) => {
//   return (
//     email.includes("@") && email.includes(".") && typeof email === "string"
//   );
// };

module.exports = { validateUsername, doesUsernameExist };
