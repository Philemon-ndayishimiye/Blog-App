let postForm = document.getElementById("post-form");
let title = document.getElementById("title");
let content = document.getElementById("content");
let imageURL = document.getElementById("imageurl");
let postContainer = document.getElementById('post-container')

postForm.addEventListener("submit" , (e)=>{
    e.preventDefault()



const addedtitle = title.value;
const addedcontent = content.value;
const addedimageurl = imageURL.value

const createdPost = {
    
    title:addedtitle,
    content:addedcontent,
    imageURL:addedimageurl

}
let postedData= JSON.parse(localStorage.getItem("posted"))|| []
if(!Array.isArray(postedData)){
    postedData=[];
    
}
postedData.push(createdPost);

localStorage.setItem("posted",JSON.stringify(postedData))

});

function renderPost(post){
 const postDiv = document.createElement("div");
 postDiv.innerHTML = `h2${createdPost.title}
 <p>${createdPost.content}</p>`

    postContainer.prepend(postDiv)
}


window.addEventListener("DOMContentLoaded", () => {
    const postedData = JSON.parse(localStorage.getItem("posted")) || [];
    postedData.forEach(renderPost);
});