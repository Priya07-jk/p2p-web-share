const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join Room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    console.log(`${socket.id} joined room ${roomId}`);

    socket.to(roomId).emit(
      "user-joined",
      `${socket.id} joined the room`
    );
  });

  // WebRTC Offer
  socket.on("offer", ({ roomId, offer }) => {
    console.log(`Offer sent in room ${roomId}`);

    socket.to(roomId).emit("offer", offer);
  });

  // WebRTC Answer
  socket.on("answer", ({ roomId, answer }) => {
    console.log(`Answer sent in room ${roomId}`);

    socket.to(roomId).emit("answer", answer);
  });

  // ICE Candidate
  socket.on("ice-candidate", ({ roomId, candidate }) => {
    socket.to(roomId).emit(
      "ice-candidate",
      candidate
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Signaling server running on port 5000");
});