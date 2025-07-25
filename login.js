const loggInData = document.getElementById("login-form");
const loggedName = document.getElementById("login-name");
const loggedPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");

loggInData.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("user logged in ");

  const userName = loggedName.value;
  const password = loggedPassword.value;
  let savedData = JSON.parse(localStorage.getItem("user")) || [];
  if (!Array.isArray(savedData)) {
    savedData = [];
  }

  const loggedUser = savedData.find(
    (user) => user.username === userName && user.passWord === password
  );

  if (loggedUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));

    if (loggedUser.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "author.html";
    }
  } else {
   loginError.textContent ="Incorrect username or password"
  }


});
