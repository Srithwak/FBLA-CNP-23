const form = document.querySelector('form');
const fs = require('fs'); //json

var data = getJSON('user.json');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  logIn();
});
function getJSON(file) { //gets data from JSON file in a useable format
   // console.log(JSON.parse(fs.readFileSync(file)));
   // const fs = require('fs');
   return JSON.parse(fs.readFileSync(file));
}


function alertPopup(title = 'Alert', description = 'Sample alert text') {
    let alertModal = document.querySelector('.alert__box');
    document.querySelector('.alert__title').innerHTML = title;
    document.querySelector('.alert__description').innerHTML = description;
    alertModal.classList.add('fade');
    setTimeout(function () {
       alertModal.classList.remove('fade');
    }, 2000);
 }
 
 function warningPopup(title = 'Warning', description = 'Sample warning text') {
    let warningModal = document.querySelector('.warning__box');
    document.querySelector('.warning__title').innerHTML = title;
    document.querySelector('.warning__description').innerHTML = description;
    warningModal.classList.add('fade');
    setTimeout(function () {
       warningModal.classList.remove('fade');
    }, 2000);
 }
 
 function errorPopup(title = 'Error', description = 'Sample error text') {
    let errorModal = document.querySelector('.error__box');
    document.querySelector('.error__title').innerHTML = title;
    document.querySelector('.error__description').innerHTML = description;
    errorModal.classList.add('fade');
    setTimeout(function () {
       errorModal.classList.remove('fade');
    }, 2000);
 }

function logIn() {
   let user = document.querySelector(".username").value;
   let pwd = document.querySelector(".password").value;
   // console.log(`${user}, ${pwd}`);
   for (let i = 0; i < data.length; i++) {
      if (user == data[i].username) {
         if (pwd == data[i].password) {
            localStorage.setItem("userObj", JSON.stringify(data[i]));
            console.log("You're good");
            if(data[i].admin)
            location.href = "students.html";
            else location.href = "hamburger.html";
            break;
         } else {
            alertPopup("Wrong password, try again", 'hia');
            break;
         }
      }
      console.log("Username not included, try again"); //repeats three times for some reason
   }
}
