const express = require("express");
const cors = require("cors");
const initializeDB = require("./db/db.connect");
const authRouter = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(cors());

initializeDB();

app.use("/auth", authRouter);

app.listen(5001, () => {
  console.log("Server is listening to port 5001");
});
