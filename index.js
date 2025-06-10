const express = require("express");
const cors = require("cors");
const initializeDB = require("./db/db.connect");

const app = express();

app.use(express.json());
app.use(cors());

initializeDB();

app.listen(5001, () => {
  console.log("Server is listening to port 5001");
});
