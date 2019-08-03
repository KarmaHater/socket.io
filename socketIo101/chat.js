const express = require("express");
const app = express();
const socketIO = require("socket.io");
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);

const io = socketIO(expressServer);

io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "welcome to the socket server" });
  socket.on("newMessageToServer", data => {
    console.log(data);
    io.emit("newMessageToClient", data);
  });
});
