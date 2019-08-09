const socket = io("http://localhost:9000");
const socketAdmin = io("http://localhost:9000/admin");

socket.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("dataFromServer", () => {
    data: "date from client";
  });
});

socket.on("joined", msg => {
  console.log(msg);
});

socketAdmin.on("welcome", dataFromServer => {
  console.log(dataFromServer);
});

document.querySelector("#message-form").addEventListener("submit", e => {
  e.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});
