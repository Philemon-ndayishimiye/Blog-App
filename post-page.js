const postForm = document.getElementById("post-form");
const title = document.getElementById("title");
const content = document.getElementById("content");
const imageURL = document.getElementById("imageurl");
const postContainer = document.getElementById("post-container");


const loggedInUser =JSON.parse( localStorage.getItem("loggedInUser"));

const LoggedAuthor =loggedInUser.username;

const AuthorName = document.querySelector('.lew');
AuthorName.innerHTML = `Welcome back <span> ${LoggedAuthor}</span> `

console.log(LoggedAuthor);

postForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const addedTitle = title.value.trim();
  const addedContent = content.value.trim();
  const addedImageURL = imageURL.value.trim();

  if (!addedTitle || !addedContent || !loggedInUser) {
    alert("Please fill in all fields and ensure you're logged in.");
    return;
  }

  const createdPost = {
    id: Date.now(),
    title: addedTitle,
    content: addedContent,
    image: addedImageURL,
    author: LoggedAuthor,
    createdAt: new Date().toISOString(),
  };

  let posts = [];
  try {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (Array.isArray(storedPosts)) {
      posts = storedPosts;
    }
  } catch (error) {
    console.error("Error parsing posts from localStorage:", error);
  }

  posts.push(createdPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  renderPost(createdPost);

  postForm.reset();
});

function renderPost(post) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.dataset.id = post.id;

  postDiv.innerHTML = `

    <h2>${post.title}</h2>
    <p><strong>Content:</strong>  ${post.content}</p>
    <p> <strong>image Url:</strong>${post.image}</p>
    <p><strong>Author:</strong> ${post.author}</p>
    <p><strong>Posted on : </strong> ${new Date(post.createdAt).toLocaleString()}</strong></p>
    
    ${
      post.author === LoggedAuthor
        ? `<button class="edit-btn">Edit</button>
           <button class="delete-btn">Delete</button>`
        : ""
    }
    
  `;

  postContainer.appendChild(postDiv);
}

postContainer.addEventListener("click", (e) => {
  const postDiv = e.target.closest(".post");
  if (!postDiv) return;

  const postId = Number(postDiv.dataset.id);
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  // Edit
  if (e.target.matches(".edit-btn")) {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    title.value = post.title;
    content.value = post.content;
    imageURL.value = post.image || "";

    const updatedPosts = posts.filter((p) => p.id !== postId);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    postDiv.remove();
  }

  // Delete
  if (e.target.matches(".delete-btn")) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const updatedPosts = posts.filter((p) => p.id !== postId);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    postDiv.remove();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  let posts = [];
  try {
    const storedPosts = JSON.parse(localStorage.getItem("posts"));
    if (Array.isArray(storedPosts)) {
      posts = storedPosts;
    }
  } catch (error) {
    console.error("Error parsing posts from localStorage on load:", error);
  }

  posts.forEach(renderPost);
});

const logoutBtn = document.getElementById("btn-logout");

logoutBtn.addEventListener('click', ()=>{

  window.location.href='login.html';
  localStorage.removeItem('loggedInUser')
})
