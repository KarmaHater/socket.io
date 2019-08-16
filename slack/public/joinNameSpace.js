const joinNameSpace = endpoint => {
  nsSocket = io(`http://localhost:9000/${endpoint}`);
  nsSocket.on("nsRoomLoad", roomlist => {
    console.log(roomlist, "roomlist");
    const roomlistDiv = document.querySelector(".room-list");
    roomlistDiv.innerHTML = "";
    roomlist.forEach(room => {
      let glyphicon = room.isPrivate ? "lock" : "globe";

      roomlistDiv.innerHTML += `<li class="room" title="${room.title}">
      <span class="glyphicon glyphicon-${glyphicon}" />${room.title}</li>`;
    });

    Array.from(document.getElementsByClassName("room")).forEach(elem => {
      elem.addEventListener("click", e => {
        console.log(elem);
      });
    });
    const topRoom = document.querySelector(".room");
    const title = topRoom.getAttribute("title");
    joinRoom(title);
  });

  nsSocket.on("newMessageToClient", data => {
    document.querySelector("#messages").innerHTML += `<li>${data.text}</li>`;
  });

  document.querySelector(".message-form").addEventListener("submit", e => {
    e.preventDefault();
    const newMessage = document.querySelector("#user-message").value;
    socket.emit("newMessageToServer", { text: newMessage });
  });
};
