// we need http because we don't have express
const http = require("http");
// we need sock.io third party lib
const socketIO = require("socket.io");

// we make a http server with node!
const server = http.createServer((req, res) => {
  res.end("connect");
});

// we need to tell the give the socket.io connection a server to listen to.
const io = socketIO(server);

io.on("connection", socket => {
  socket.emit("whatIsUpClient", "here is the data client");
  socket.on("whatIsUpServer", data => {
    console.log(data);
  });
});

server.listen(3000);
