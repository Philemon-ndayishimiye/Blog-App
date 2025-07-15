const formData = document.getElementById('form-data')
const userN = document.getElementById('user-name')
const passWord = document.getElementById('password')
const role = document.getElementById('select-role')

formData.addEventListener('submit',(e)=>{

e.preventDefault()



 let userName= userN.value;
 let inputPassword= passWord.value;
 let userRole = role.value;

 

 const userData ={
    username: userName,
    passWord: inputPassword,
    role: userRole

 }
 
   let savedData = JSON.parse(localStorage.getItem("user")) ||[];
 if (!Array.isArray(savedData)) {
    savedData = [];
 }


 let userExist = false ;

  savedData.forEach(element => {
    if(element.username === userName){
        userExist=true ;
    }
    
 });

 if(userExist){
    alert('username exist')
 }
 else{
  savedData.push(userData);
  localStorage.setItem("user", JSON.stringify(savedData));
  window.location.href = 'login.html'
 
 
 }

 


//console.log(`${userName} and ${inputPassword} ${userRole}`)
})




