const joinRoom = title => {
  // send the room title to the server
  nsSocket.emit("joinRoom", title, newNubmerOfUser => {
    //   update room total
    const userCount = document.querySelector(".curr-room-num-users");
    userCount.innerHTML =
      newNubmerOfUser + 1 + ' <span class="glyphicon glyphicon-user"></span> ';
  });
};
