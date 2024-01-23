async function render() {
  // const formCreate = document.querySelector("#tableID");
  try {
    const res = await fetch("https://todo-for-n92.cyclic.app/todos/add", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    if (!res.ok) {
      throw new Error("Error something Api");
    }
    const data = await res.json();
    console.log(data);
    // return data;
  } catch (error) {
    console.log(error);
  }
}
render();
// console.log(localStorage.getItem("token"));
