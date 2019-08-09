const express = require("express");
const app = express();
const socketIO = require("socket.io");

let namespace = require("./data/namespaces");
app.use(express.static(__dirname + "/public"));
  
const expressServer = app.listen(9000);

const io = socketIO(expressServer);

io.on("connection", socket => {
  console.log("connected to main namespace");
  socket.emit("messageFromServer", { data: "welcome to the socket server" });
  socket.on("newMessageToServer", data => {
    console.log(data);
    io.emit("newMessageToClient", data);
  });

  socket.join("level1");
  io.to("level1").emit(
    "joined",
    `${socket.id} i have joined the level one room`
  );

  io.of("/admin").on("connect", socket => {
    console.log("connected to admin namespace");
    io.of("/admin").emit("welcome", "Welcome to the admin channel");
  });
});
