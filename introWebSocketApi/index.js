const http = require("http");
const webSocket = require("ws");

const server = http.createServer((req, res) => {
  res.end("connect");
});

const wss = new webSocket.Server({ server });
// this is listening to the server on line 4 because when is changes it will notify the client
wss.on("headers", (headers, req) => {
  console.log(headers);
});

wss.on("connection", (ws, req) => {
  console.log(ws);
  ws.send("welcome");
  ws.on("message", msg => {
    console.log(msg);
  });
});

server.listen(8000);
