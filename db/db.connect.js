const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB_CONNECTION_STRING;

const initializeDB = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Failed connecting to Database", error));
};

module.exports = initializeDB;
