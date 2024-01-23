const container = document.querySelector(".container"),
  registerBtn = document.querySelector("#register"),
  loginBtn = document.querySelector(".login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});
loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// !======================Sign Up=========================
const createAccount = document.querySelector("#createAccount");
const content = document.querySelector(".content");
const API = "https://todo-for-n92.cyclic.app/user/register";
createAccount.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = event.target[0],
    email = event.target[1],
    password = event.target[2];

  const users = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  // Set Data to Backend
  try {
    const res = await fetch(API, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });
    if (!res.ok) {
      throw new Error("Error something student");
    }
    const data = await res.json();
    console.log(data);
    createAccount.reset();

    // fetch(API)
    //   .then((result) => {
    //     return result.json();
    //   })
    //   .then((data) => {
    // for (let i of data) {
    // switch (true) {
    //   case i.email == student.email:
    //     console.log("bu bor");
    //     break;
    //   default:
    //     console.log("bu ne");
    //     break;
    // }

    // }
    //   console.log(data);
    // });
    // console.log(data);
  } catch (error) {
    console.error("Error", error);
    console.log(error.message);
  }
});

// !======================Sign In=========================

const formSignIn = document.querySelector("#formSignIn");

formSignIn.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target[0].value,
    password = event.target[1].value;

  fetch(API)
    .then((res2) => {
      return res2.json();
    })
    .then((data) => {
      for (let key of data) {
        if (email === key.email && password === key.password) {
          console.log(key.name);
          location.href = "./index.html";
        } else {
          const failed = document.querySelector("#failed");
          failed.style.borderColor = "red";
        }
      }
      // formSignIn.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});
