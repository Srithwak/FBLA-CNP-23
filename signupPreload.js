const form = document.querySelector('form');
const fs = require('fs'); //json

var data = getJSON('user.json');
form.addEventListener('submit', (event) => {
   event.preventDefault();
   signUp();
});
function getJSON(file) { //gets data from JSON file in a useable format
   // console.log(JSON.parse(fs.readFileSync(file)));
   // const fs = require('fs');
   return JSON.parse(fs.readFileSync(file));
}

function signUp() {
   let name = document.querySelector(".name").value;
   let user = document.querySelector(".username").value;
   let grade = document.querySelector(".grade").value;
   let pwd2 = document.querySelector(".pwd1").value;
   let pwd1 = document.querySelector(".pwd2").value;
   let pBol = false;
   let uBol = false;
   if (pwd1 != pwd2) {
      console.log("Passwords don't match, try again");
      pBol = true;
   }
   if ((pwd1.includes(" ") || pwd1.length < 2) && !pBol) {
      console.log("Invalid Password, try again");
      pBol = true;
   }
   if (!pBol)
      for (let i = 0; i < data.length; i++)
         if (user == data[i].username) {
            console.log("Username not available");
            uBol = true;
            break;
         }
   if (uBol)
      document.querySelector('.username').value = "";
   if (pBol) {
      document.querySelector('.pwd1').value = "";
      document.querySelector('.pwd2').value = "";
   }
   if (uBol || pBol)
      return;
   data.push({
      "name": name,
      "grade": grade,
      "username": user,
      "password": pwd1,
      "points": 0,
      "pastPrizes": [],
      "pastEvents": []
   });
   console.log(data);
   //send to admin account to verify and then push
}