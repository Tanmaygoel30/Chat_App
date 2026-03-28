const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if(userId){
    userSocketMap[userId] = socket.id;
  }

  console.log("User connected: ", userId, socket.id);

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log("User disconnected: ", userId, socket.id);
  });
});

module.exports = { io, app, server, userSocketMap };
