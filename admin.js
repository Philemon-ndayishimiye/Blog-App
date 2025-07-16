const savedData = JSON.parse(localStorage.getItem("user")) || [];
const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
const adminName = document.getElementById("adminName");
console.log(loggedUser.username);

adminName.textContent = `Welcome Back ${loggedUser.username} 😊😊`;

const listSection = document.getElementById("User-list");

listSection.innerHTML = `

 <table class="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
         <tbody id="user-table-body">
         </tbody>
      </table>
`;
const tbody = document.getElementById("user-table-body");

savedData.forEach((user) => {
  const row = document.createElement("tr");

  row.innerHTML += `
   <td>${user.username}</td>
   <td>${user.role}</td>
  `;

  tbody.appendChild(row);
});

const Logout = document.getElementById("logout");

Logout.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});
