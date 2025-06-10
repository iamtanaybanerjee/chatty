const {
  validateUsernameAndEmail,
  doesUsernameExist,
  validateEmail,
} = require("../validations/validations");

const registerUser = async (req, res) => {
  const body = req.body;
  try {
    const errors = validateUsernameAndEmail(body);
    if (errors.length > 0) return res.status(400).json({ errors });

    const value = await doesUsernameExist(body.username);
    if (value === true)
      return res.status(400).json({ error: "Username already exist" });

    const value2 = await validateEmail(body.email);
    if (value2 === false)
      return res.status(400).json({ error: "Invalid email" });

    //move forward
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
