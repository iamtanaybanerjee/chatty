const express = require("express");
const cors = require("cors");
const initializeDB = require("./db/db.connect");
const authRouter = require("./routes/auth.route");
const { Server } = require("socket.io");
const http = require("http");
const Message = require("./models/Message.model");
const User = require("./models/User.model");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
app.use(cors());

initializeDB();

app.use("/auth", authRouter);

//socket logic
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("send_message", async (data) => {
    const { sender, receiver, message } = data;
    const messageObj = await Message.create({ sender, receiver, message });
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

app.get("/messages", async (req, res) => {
  const { sender, receiver } = req.query;
  try {
    const messageList = await Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });
    return res.json({ messages: messageList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  const { currentUser } = req.query;
  try {
    const users = await User.find({
      username: {
        $ne: currentUser,
      },
    });
    res.json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(5001, () => {
  console.log("Server is listening to port 5001");
});
