
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {

  socket.on("join-room", (room) => {
    if (
      typeof room !== "string" ||
      !/^[a-f0-9-]{8,80}$/i.test(room)
    ) return;

    const clients = io.sockets.adapter.rooms.get(room);

    if (clients && clients.size >= 2) {
      socket.emit("room-full");
      return;
    }

    socket.join(room);
    socket.data.room = room;

    socket.emit("joined", {
      initiator: !clients || clients.size === 0
    });

    socket.to(room).emit("peer-joined");
  });

  ["offer", "answer", "ice-candidate"].forEach(event => {
    socket.on(event, (data) => {
      if (!socket.data.room) return;
      socket.to(socket.data.room).emit(event, data);
    });
  });

  socket.on("disconnect", () => {
    if (socket.data.room) {
      socket.to(socket.data.room).emit("peer-left");
    }
  });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`LAN Connect running on port ${PORT}`);
});
