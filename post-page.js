const postForm = document.getElementById("post-form");
const title = document.getElementById("title");
const content = document.getElementById("content");
const imageURL = document.getElementById("imageurl");
const postContainer = document.getElementById("post-container");

const loggedInUser = localStorage.getItem("loggedInUser");

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
    author: loggedInUser,
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
  postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        ${
          post.image
            ? `<img src="${post.image}" alt="Post Image" style="max-width: 100%; height: auto;" />`
            : ""
        }
        <p><strong>Author:</strong> ${post.author}</p>
        <p><small>Posted on ${new Date(
          post.createdAt
        ).toLocaleString()}</small></p>
        <hr/>
    `;
  postContainer.prepend(postDiv);
}

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
