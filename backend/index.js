import express from "express"
import { Server } from "socket.io";
import { createServer } from 'http'
import cors from 'cors';
import { connect } from "./data/database/config.js";
import UserRouter from "./routes/UserRouter.js";
import FriendRouter from "./routes/FriendsRouter.js";
import ChatRouter from "./routes/ChatRouter.js";


const port = 5000;
connect();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    'origin': '*',
    'methods': ["GET", "POST"],
    'credentials': true,
    'Access-Control-Allow-Origin' : '*',
  }
});
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  // console.log(socket);
  socket.on("message", ({ message, room }) => {
    // console.log({ room, message });
    socket.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use('/api/user/', UserRouter);
app.use('/api/user/friend', FriendRouter)
app.use('/api/user/friend/chat', ChatRouter)


app.get('/', (req, res) => {
  res.send('Hello Horror!!')
})

server.listen(port, () => {
  console.log(`Server is running at port :${port}`);
})