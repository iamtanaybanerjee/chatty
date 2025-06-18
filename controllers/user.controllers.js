const {
  validateUsername,
  doesUsernameExist,
} = require("../validations/validations");
const { createUser, isLoginSuccessful } = require("../services/user.services");

const registerUser = async (req, res) => {
  const body = req.body;
  try {
    const errors = validateUsername(body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const value = await doesUsernameExist(body.username);
    if (value === true)
      return res.status(400).json({ error: "Username already exist" });

    //move forward
    const response = await createUser(body);
    return res.status(201).json({
      message: "User registered successfully",
      token: response.token,
      username: response.username,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const body = req.body;
  try {
    const errors = validateUsername(body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const value = await doesUsernameExist(body.username);
    if (value === false)
      return res
        .status(404)
        .json({ message: "User does not exist, please sign-up" });

    //move forward
    const resposne = await isLoginSuccessful(body);
    if (resposne === true)
      return res
        .status(200)
        .json({ message: "Login successful", username: body.username });
    else return res.status(400).json({ error: "Invalid password" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
