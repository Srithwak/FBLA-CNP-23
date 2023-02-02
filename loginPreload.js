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

function logIn() {
   let user = document.querySelector(".username").value;
   let pwd = document.querySelector(".password").value;
   // console.log(`${user}, ${pwd}`);
   for (let i = 0; i < data.length; i++) {
      if (user == data[i].username) {
         if (pwd == data[i].password) {
            localStorage.setItem("userObj", JSON.stringify(data[i]));
            alert("You're good");
            if(data[i].admin)
            location.href = "students.html";
            else location.href = "hamburger.html";
            break;
         } else {
            console.log("Wrong password, try again");
            break;
         }
      }
      console.log("Username not included, try again"); //repeats three times for some reason
   }
}