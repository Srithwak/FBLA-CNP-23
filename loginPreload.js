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

function errorPopup(title) {
    let errorModal = document.querySelector('.error__box');
    document.querySelector('.error__title').innerHTML = title;
    errorModal.classList.add('fade');
    setTimeout(function () {
        errorModal.classList.remove('fade');
    }, 1500);
}

function logIn() {
    let user = document.querySelector(".username").value; //gets username
    let pwd = document.querySelector(".password").value;  //gets password
    let bol = true;
    //loops through the JSON file and tries to find the username and password
    for (let i = 0; i < data.length; i++) {
        if (user == data[i].username) { //if the username that the user entered is found
            if (pwd == data[i].password) { //if the passsword the user entered matches the username
                localStorage.setItem("userObj", JSON.stringify(data[i])); //sets the user object to localStorage
                if (data[i].admin) {
                    bol = false;
                    location.href = "students.html"; //if the user is an admin, redirects to students.html
                }
                else {
                    bol = false;
                    location.href = "stuNotifs.html"; //if the user is a student, redirects to stuNotifs.html
                }
                break;
            } else {
                errorPopup("Wrong password, try again"); //if the password does not match the username
                break;
            }
        }
        if(bol)
        errorPopup("Username was not found, try again"); //if the username was not found in the database
    }
}
