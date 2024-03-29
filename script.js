document.addEventListener("DOMContentLoaded", function () {
  const dataToken = localStorage.getItem("token");
  if (!dataToken) {
    location.href = "./login.html";
  }
  // Start Loader
  const enterForm = document.querySelector("#formEnter");

  // dataBase
  let dataBase = {
    tasksAll: JSON.parse(localStorage.getItem("tasks")) || [],
    addTask(newTask) {
      this.tasksAll.push(newTask);
    },
  };
  // render("tasks");
  const dataInLocalDB = [];
  enterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // variebles
    const task = event.target[0].value,
      textArea = event.target[1],
      currentDate = event.target[2],
      cancel = event.target[3];

    const todoInfo = {
      id: dataBase.tasksAll.length,
      // taskName: taskName.value,
      textArea: textArea.value,
      currentDate: currentDate.value,
      complate: false,
    };

    dataBase.addTask(todoInfo);
    localStorage.setItem("tasks", JSON.stringify(dataBase.tasksAll));

    // console.log(dataBase);

    // Backenddan kelayotgan message task
    async function render() {
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
          const dataInLocal = {
            data: data,
          };
          dataInLocalDB.push(dataInLocal);
          renderHtml(result);

          console.log(dataInLocalDB);
        })
        .catch((error) => console.error("Add Todo Error:", error));
    }
    render();

    // LocalStoragedagoi malumotlar kelishi
    function renderHtml(result) {
      const formCreate = document.querySelector("#tableID");
      formCreate.innerHTML = "";
      console.log(result);
      switch (result) {
        case "tasks":
          dataBase.tasksAll.forEach((eachTask) => {
            const template = `
        <div class="todo-info d-flex align-items-start gap-4 p-2 my-4">
          <input type="checkbox" class="mt-2" id="for${eachTask.id}" />
          <label
            class="companents border-bottom border-primary pb-2"
            for="for${eachTask.id}"
          >
            <h2 class="fs-4">${eachTask.task}</h2>
            <p>
              ${eachTask.textArea}
            </p>
            <div class="dateAndUsers d-flex align-items-center gap-3">
              <span class="d-flex align-items-center gap-2"
                ><i class="fa fa-calendar"></i>${eachTask.currentDate}</span
              >
              <span class="d-flex align-items-center gap-2"
                ><i class="fa fa-user-o"></i> Esther Howard</span
              >
            </div>
          </label>
        </div>
      `;

            const counter = document.querySelector(".counter");
            counter.textContent = `${eachTask.id + 1}`;
            formCreate.innerHTML += template;
          });
          break;

        default:
          break;
      }
    }

    renderHtml("tasks");
  });

  // Delete function
  const deleteItem = document.querySelector("#delete");
  deleteItem.addEventListener("click", deleteList);

  function deleteList() {
    const checkboxes = document.querySelectorAll('[type="checkbox"]:checked');

    if (checkboxes.length > 0) {
      const confirmDelete = confirm("Ishonching komilmi");
      if (confirmDelete) {
        checkboxes.forEach((checkbox) => {
          const itemLocalStorage = JSON.parse(localStorage.getItem("tasks"));
          delete itemLocalStorage;
          const row = checkbox.closest(".todo-info");
          row.remove();
        });
      }
    } else {
      console.log(checkboxes);
      alert("tanlanmagan");
    }
  }

  function editList() {
    const checkboxes = document.querySelectorAll('[type="checkbox"]:checked');

    if (checkboxes.length > 0) {
      const confirmDelete = confirm("Ishonching komilmi");
      if (confirmDelete) {
        checkboxes.forEach((checkbox) => {
          const itemLocalStorage = JSON.parse(localStorage.getItem("tasks"));
          delete itemLocalStorage;
          const row = checkbox.closest(".todo-info");
          row.remove();
        });
      }
    } else {
      console.log(checkboxes);
      alert("tanlanmagan");
    }
  }
  // End of Loader
});
