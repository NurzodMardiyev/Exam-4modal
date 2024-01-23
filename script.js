fetch("https://crudcrud.com/api/704510dac0bb4190bdf84aea650b293d/users")
  .then((res2) => {
    return res2.json();
  })
  .then((data) => {
    for (let key of data) {
      if (!correct) {
        location.href = "./login.html";
      }
    }
    // formSignIn.reset();
  })
  .catch((err) => {
    console.log(err);
  });

document.addEventListener("DOMContentLoaded", function () {
  // Start Loader
  const enterForm = document.querySelector("#formEnter");

  // dataBase
  let dataBase = {
    tasksAll: JSON.parse(localStorage.getItem("tasks")) || [],
    addTask(newTask) {
      this.tasksAll.push(newTask);
    },
  };

  render("tasks");
  enterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // variebles
    const taskName = event.target[0],
      textArea = event.target[1],
      currentDate = event.target[2],
      cancel = event.target[3];

    const todoInfo = {
      id: dataBase.tasksAll.length,
      taskName: taskName.value,
      textArea: textArea.value,
      currentDate: currentDate.value,
      complate: false,
    };

    dataBase.addTask(todoInfo);
    localStorage.setItem("tasks", JSON.stringify(dataBase.tasksAll));

    render("tasks");
    console.log(dataBase);
  });

  function render(result) {
    const formCreate = document.querySelector("#tableID");

    formCreate.innerHTML = "";

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
                <h2 class="fs-4">${eachTask.taskName}</h2>
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
