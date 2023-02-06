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
    let user = document.querySelector(".username").value;
    let pwd = document.querySelector(".password").value;
    // console.log(`${user}, ${pwd}`);
    for (let i = 0; i < data.length; i++) {
        if (user == data[i].username) {
            if (pwd == data[i].password) {
                localStorage.setItem("userObj", JSON.stringify(data[i]));
                console.log("You're good");
                if (data[i].admin)
                    location.href = "students.html";
                else location.href = "stuNotifs.html";
                break;
            } else {
                errorPopup("Wrong password, try again", 'hia');
                break;
            }
        }
        console.log("Username not included, try again"); //repeats three times for some reason
    }
}
