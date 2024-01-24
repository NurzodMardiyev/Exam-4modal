async function render() {
  // const formCreate = document.querySelector("#tableID");
  const task = "nimadir";
  fetch("https://todo-for-n92.cyclic.app/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ task }),
  })
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      rederData();
    })
    .catch((error) => console.error("Add Todo Error:", error));
}
render();
// console.log(localStorage.getItem("token"));
