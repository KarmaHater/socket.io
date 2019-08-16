const express = require("express");
const app = express();
const socketIO = require("socket.io");

let namespaces = require("./data/namespaces");
app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketIO(expressServer);

io.on("connection", socket => {
  // build and array with the image and endpoint for each name space
  let nsData = namespaces.map(ns => {
    return {
      img: ns.image,
      endpoint: ns.endpoint
    };
  });
  // send the data back to the client; use socket to send it just to this client and not to IO
  socket.emit("nsData", nsData);
  // if you did it to io that would be everyone connected to the main namespaces
});

namespaces.forEach(ns => {
  io.of(ns.endpoint).on("connection", nsSocket => {
    console.log("has joined");
    console.log(ns.endpoint);
    nsSocket.emit("nsRoomLoad", namespaces[0].rooms);
    nsSocket.emit("joinRoom", (roomToJoin, numberOfUserCallback) => {
      nsSocket.join(roomToJoin);
      numberOfUserCallback();
    });
  });
});
