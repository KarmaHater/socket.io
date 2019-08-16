const socket = io("http://localhost:9000");
let nsSocket = "";
// listen for namespace data
socket.on("nsData", list => {
  const namespaceDiv = document.getElementsByClassName("namespaces")[0];
  namespaceDiv.innerHTML = "";
  list.forEach(item => {
    namespaceDiv.innerHTML += `<div class="namespace" ns="${
      item.endpoint
    }"><img  src="${item.img}"/></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(elem => {
    elem.addEventListener("click", e => {
      console.log(elem);
      e.target;
    });
  });
  joinNameSpace("wiki");
});
