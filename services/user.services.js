const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createUser = async (body) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await User.create({
      username: body.username,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    return { token, username: user.username };
  } catch (error) {
    throw error;
  }
};

const isLoginSuccessful = async (body) => {
  try {
    const userObj = await User.findOne({ username: body.username });
    const isPasswordMatch = await userObj.comparePassword(body.password);
    return isPasswordMatch === true ? true : false;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, isLoginSuccessful };
