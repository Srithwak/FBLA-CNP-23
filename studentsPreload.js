const form = document.querySelector('form');
const fs = require('fs'); //json
const { SourceMap, findSourceMap } = require('module');
const { DefaultDeserializer } = require('v8');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    filter();
});
function getJSON(file) { //gets data from JSON file in a useable format
    // console.log(JSON.parse(fs.readFileSync(file)));
    // const fs = require('fs');
    return JSON.parse(fs.readFileSync(file));
}
function uploadJSON(data, file) { //overwrites JSON file and uploads with data
    fs.writeFileSync(file, JSON.stringify(data, null, 2), {
        encoding: 'utf8',
        flag: 'w'
    });
    console.log("Upload complete");
}

let filteredData = getJSON("user.json");


var grades;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function onload() {
    grades = {
        x9: [],
        x10: [],
        x11: [],
        x12: []
    }
    let users = getJSON('user.json');
    for (i of users)
        if (i.grade == "9")
            grades.x9.push(i);
        else if (i.grade == "10")
            grades.x10.push(i);
        else if (i.grade == "11")
            grades.x11.push(i);
        else
            grades.x12.push(i);
}

function randWinner() {
    let h1;
    onload();
    if (grades.x9.length > 0)
        h1 = "Grade 9: " + grades.x9[getRandomInt(grades.x9.length)].name + " ";
    else h1 = "No students in grade 9 exist ";
    if (grades.x10.length > 0)
        h1 += "Grade 10: " + grades.x10[getRandomInt(grades.x10.length)].name + " ";
    else h1 += "No students in grade 10 exist ";
    if (grades.x11.length > 0)
        h1 += "Grade 11: " + grades.x11[getRandomInt(grades.x11.length)].name + " ";
    else h1 += "No students in grade 11 exist ";
    if (grades.x12.length > 0)
        h1 += "Grade 12: " + grades.x12[getRandomInt(grades.x12.length)].name;
    else h1 += "No students in grade 12 exist ";
    document.querySelector(".randWinner").textContent = h1;
}

function topWinner() {
    onload();
    let top = {
        x9: "",
        x10: "",
        x11: "",
        x12: ""
    };
    let count9 = [{
        name: "",
        points: 0
    }];
    let counter9 = 0;
    if (grades.x9.length > 0)
        for (let i = 0; i < grades.x9.length; i++)
            if (grades.x9[i].points > count9[0].points)
                count9[counter9] = {
                    name: grades.x9[i].name,
                    points: grades.x9[i].points
                };
            else if (grades.x9[i].points == count9[0].points) {
                counter++;
                count9[counter9] = {
                    name: grades.x9[i].name,
                    points: grades.x9[i].points
                };
            }

    let count10 = [{
        name: "",
        points: 0
    }];
    let counter10 = 0;
    if (grades.x10.length > 0)
        for (let i = 0; i < grades.x10.length; i++)
            if (grades.x10[i].points > count10[0].points)
                count10[counter10] = {
                    name: grades.x10[i].name,
                    points: grades.x10[i].points
                };
            else if (grades.x10[i].points == count10[0].points) {
                counter++;
                count10[counter10] = {
                    name: grades.x10[i].name,
                    points: grades.x10[i].points
                };
            }

    let count11 = [{
        name: "",
        points: 0
    }];
    let counter11 = 0;
    if (grades.x11.length > 0)
        for (let i = 0; i < grades.x11.length; i++)
            if (grades.x11[i].points > count11[0].points)
                count11[counter11] = {
                    name: grades.x11[i].name,
                    points: grades.x11[i].points
                };
            else if (grades.x11[i].points == count11[0].points) {
                counter++;
                count11[counter11] = {
                    name: grades.x11[i].name,
                    points: grades.x11[i].points
                };
            }

    let count12 = [{
        name: "",
        points: 0
    }];
    let counter12 = 0;
    if (grades.x12.length > 0)
        for (let i = 0; i < grades.x12.length; i++)
            if (grades.x12[i].points > count12[0].points)
                count12[counter12] = {
                    name: grades.x12[i].name,
                    points: grades.x12[i].points
                };
            else if (grades.x12[i].points == count12[0].points) {
                counter++;
                count12[counter12] = {
                    name: grades.x12[i].name,
                    points: grades.x12[i].points
                };
            }

    let h1 = "";
    if (count9.length === 1) {
        h1 += `The top winner in grade 9 is ${count9[0].name} with ${count9[0].points} points.`;
    } else if (count9.length > 1) {
        h1 += `The top winners in grade 9 are: `;
        for (let i = 0; i < count9.length; i++) {
            h1 += `${count9[i].name} with ${count9[i].points} points`;
            if (i !== count9.length - 1) {
                h1 += `, `;
            }
        }
        h1 += `. `;
    }

    if (count10.length === 1) {
        h1 += `The top winner in grade 10 is ${count10[0].name} with ${count10[0].points} points.`;
    } else if (count10.length > 1) {
        h1 += `The top winners in grade 10 are: `;
        for (let i = 0; i < count10.length; i++) {
            h1 += `${count10[i].name} with ${count10[i].points} points`;
            if (i !== count10.length - 1) {
                h1 += `, `;
            }
        }
        h1 += `. `;
    }

    if (count11.length === 1) {
        h1 += `The top winner in grade 11 is ${count11[0].name} with ${count11[0].points} points.`;
    } else if (count11.length > 1) {
        h1 += `The top winners in grade 11 are: `;
        for (let i = 0; i < count11.length; i++) {
            h1 += `${count11[i].name} with ${count11[i].points} points`;
            if (i !== count11.length - 1) {
                h1 += `, `;
            }
        }
        h1 += `. `;
    }

    if (count12.length === 1) {
        h1 += `The top winner in grade 12 is ${count12[0].name} with ${count12[0].points} points.`;
    } else if (count12.length > 1) {
        h1 += `The top winners in grade 12 are: `;
        for (let i = 0; i < count12.length; i++) {
            h1 += `${count12[i].name} with ${count12[i].points} points`;
            if (i !== count12.length - 1) {
                h1 += `, `;
            }
        }
        h1 += `.`;
    }
    document.querySelector(".topWinner").textContent = h1;
}


function filter() {
    let name = document.querySelector(".name").value;
    let user = document.querySelector(".username").value;
    let grade = document.querySelector(".grade").value;
    let points = document.querySelector(".points").value;
    let currentPrize = document.querySelector(".currentPrize").value;
    let admin = document.querySelector(".admin3").checked;
    let student = document.querySelector(".student3").checked;
    let none = document.querySelector(".none3").checked;
    let users = getJSON("user.json");
    let tmp = [];
    for (i of users) {
        tmp.push(i.name)
    }
    let p = tmp.filter(i => i.includes(name));
    filteredData = [];
    for (let i = 0; i < users.length; i++) {
        if (p.includes(users[i].name)) {
            filteredData.push(users[i]);
        }
    }
    //at this the names have been filtered out
    users = filteredData;
    tmp = [];
    for (i of users) {
        tmp.push(i.username);
    }

    p = tmp.filter(i => i.includes(user));
    filteredData = [];
    for (let i = 0; i < users.length; i++) {
        if (p.includes(users[i].username)) {
            filteredData.push(users[i]);
        }
    }
    //at this point usernames have been filtered out
    if (grade != 0) {
        users = filteredData;
        tmp = [];
        for (i of users)
            tmp.push(i.grade);
        p = tmp.filter(i => i == grade);
        filteredData = [];
        for (let i = 0; i < users.length; i++) {
            if (p.includes(users[i].grade)) {
                filteredData.push(users[i]);
            }
        }
    }

    if (points != null && points != "") {
        users = filteredData;
        tmp = [];
        filteredData = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].points <= points) //pushes if the points filtered is less than the students points
                filteredData.push(users[i]);
        }
    }

    if (currentPrize != "") {
        users = filteredData;
        tmp = [];
        filteredData = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].currentPrize.includes(currentPrize))
                filteredData.push(users[i]);
        }
    }

    if (admin) {
        users = filteredData;
        tmp = [];
        filteredData = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].admin === true) {
                filteredData.push(users[i]);
            }
        }
    } else if (student) {
        users = filteredData;
        tmp = [];
        filteredData = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].admin === false) {
                filteredData.push(users[i]);
            }
        }
    }

    let tableBody = document.querySelector('#students-table tbody');
    tableBody.innerHTML = ""; // clear existing rows
    for (let i = 0; i < filteredData.length; i++) {
        let student = filteredData[i];
        let x;
        if (checkedArr.includes(filteredData[i].key)) {
            x = "checked";
        } else {
            x = "";
        }
        //  x = "checked";
        let row = `<tr>
                        <td><input class = "checked${i}" contenteditable = "true" type = "checkbox" onchange = "verifyChecked(${student.key}, ${i})"${x}></td>
                        <td class = "name${i}" contenteditable="true">${student.name}</td>
                        <td class = "grade${i}" contenteditable="true">${student.grade}</td>
                        <td class = "username${i}" contenteditable="true">${student.username}</td>
                        <td class = "password${i}" contenteditable="true">${student.password}</td>
                        <td class = "points${i}" contenteditable="true">${student.points}</td>
                        <td class = "currentPrize${i}" contenteditable="true">${student.currentPrize}</td>
                        <td class = "admin${i}"contenteditable="true">${student.admin}</td>
                        <td>
                           <button onclick="saveChanges(${student.key}, ${i})">Save</button>
                           <button onclick="deleteStudent(${student.key})">Delete</button>
                           <button onclick="cancelChanges(${student.key}, ${i})">Cancel</button>
                      </td>
                  </tr>`;
        tableBody.innerHTML += row;
    }
}

var checkedArr = [];


function verifyChecked(key, index) {
    if (document.querySelector(`.checked${index}`).checked)
        checkedArr.push(key);
    else
        for (let i = 0; i < checkedArr.length; i++)
            if (checkedArr[i] == key)
                checkedArr.splice(i, 1);
}


function clearAllChecked() {
    checkedArr = [];
    filter();
}

function checkAll() {
    checkedArr = [];
    let users = getJSON("user.json");
    for (i of users)
        checkedArr.push(i.key);
    filter();
}

function givePrizes() {
    let users = getJSON("user.json");
    // let adminAssign = document.getElementById("adminAssign").checked;
    // let adminAssign = false;
    let prizes = getJSON("prizes.json");

    for (let i = 0; i < prizes.length; i++) {
        let min = i;
        for (let j = i + 1; j < prizes.length; j++) {
            if (prizes[j].points > prizes[min].points) {
                min = j
            }
        }
        if (min !== i) {
            [prizes[i], prizes[min]] = [prizes[min], prizes[i]];
        }
    }
    for (let i = 0; i < users.length; i++) {
        for (let p = 0; p < prizes.length; p++) {
            if (users[i].points >= prizes[p].points && checkedArr.includes(users[i].key)) {
                users[i].currentPrize = prizes[p].name;
                break;
            }
        }
    }
    uploadJSON(users, 'user.json');
    filter()
}

function checkAllAdmin() {
    let users = getJSON('user.json');
    for (let i = 0; i < users.length; i++)
        if (users[i].admin && !checkedArr.includes(users[i].key))
            checkedArr.push(users[i].key);
    filter();
}

function checkAllStudent() {
    let users = getJSON('user.json');
    for (let i = 0; i < users.length; i++)
        if (!users[i].admin && !checkedArr.includes(users[i].key))
            checkedArr.push(users[i].key);
    filter()

}

function resetPrizes() {
    let users = getJSON("user.json");
    for (let i = 0; i < users.length; i++) {
        if (checkedArr.includes(users[i].key)) {
            users[i].currentPrize = "None";
        }
    }
    uploadJSON(users, 'user.json');
    filter();
}

function cancelChanges(key, index) {
    let users = getJSON("user.json");
    let user;
    for (i of users) {
        if (i.key == key)
            user = i;
    }
    let tableBody = document.querySelector('#students-table tbody');
    let nameCell = document.querySelector(`.name${index}`);
    nameCell.innerHTML = user.name;
    let gradeCell = document.querySelector(`.grade${index}`);
    gradeCell.innerHTML = user.grade;
    let usernameCell = document.querySelector(`.username${index}`);
    usernameCell.innerHTML = user.username;
    let passwordCell = document.querySelector(`.password${index}`);
    passwordCell.innerHTML = user.password;
    let pointsCell = document.querySelector(`.points${index}`);
    pointsCell.innerHTML = user.points;
    let currentPrizeCell = document.querySelector(`.currentPrize${index}`);
    currentPrizeCell.innerHTML = user.currentPrize;
    let adminCell = document.querySelector(`.admin${index}`);
    adminCell.innerHTML = user.admin;
}

function updatePoints() {
    let users = getJSON("user.json"); // get the JSON data
    let eventName = document.querySelector(".eventName").value; // get the input value for the event name
    let events = getJSON('events.json');
    // let studentName = document.querySelector(".newName").value; // get the input value for the student name
    let studentName = [];
    for(i of users)
        if(checkedArr.includes(i.key))
            studentName.push(i.name);
    let add = document.querySelector(".add").checked;
    let remove = document.querySelector(".remove").checked;
    
    let addRemove;
    if (add) addRemove = "add";
    else if (remove) addRemove = "remove";
    let points;
    for (i of events)
        if (i.event === eventName) {
            points = i.pointsGained;
            break;
        }
    for (let i = 0; i < users.length; i++) {
        if (studentName.includes(users[i].name)) { // find the student with the matching name
            if (addRemove === "add") { // check if the user wants to add or remove points
                users[i].points += parseInt(points); // add the points to the student's current points
            } else if (addRemove === "remove") {
                users[i].points -= parseInt(points); // remove the points from the student's current points
            }
        }
    }
    uploadJSON(users, "user.json"); // upload the updated data to the JSON file
    filter(); // re-filter the table to show the updated data
}

function saveChanges(key, num) {
    let students = getJSON("user.json");
    let name = document.querySelector(`.name${num}`).innerText;
    let grade = document.querySelector(`.grade${num}`).innerText;
    let username = document.querySelector(`.username${num}`).innerText;
    let password = document.querySelector(`.password${num}`).innerText;
    let points = document.querySelector(`.points${num}`).innerText;
    let currentPrize = document.querySelector(`.currentPrize${num}`).innerText;
    let admin = document.querySelector(`.admin${num}`).innerText;
    if (admin == "true") {
        admin = true;
    } else {
        admin = false;
    }
    for (let i = 0; i < students.length; i++) {
        if (students[i].key == key) {
            students[i].name = name;
            students[i].grade = grade;
            students[i].username = username;
            students[i].password = password;
            students[i].points = parseInt(points);
            students[i].currentPrize = currentPrize;
            students[i].admin = admin;
            break;
        }
    }

    uploadJSON(students, "user.json");
    filter();
}




function deleteStudent(key) {
    let users = getJSON("user.json");
    for (let i = 0; i < users.length; i++) {
        if (users[i].key == key)
            users.splice(i, 1);
    }
    uploadJSON(users, "user.json");
    filter();
}

function addNewStudent() {
    // Create a new row in the table
    let newRow = document.createElement('tr');
    newRow.innerHTML = `<td></td>
   <td><input class="limit__width" type="text" class="new-name"></td>
                      <td><input class="limit__width" type="number" min = 9 max = 12 class="new-grade"></td>
                      <td><input class="limit__width" type="text" class="new-username"></td>
                      <td><input class="limit__width" type="text" class="new-password"></td>
                      <td><input class="limit__width" type="number" min="0" class="new-points"></td>
                      <td><input class="limit__width" type="text" class="new-currentPrize"></td>
                      <td><input class="limit__width" type="checkbox" class="new-admin" checked></td>
                      <td>
                         <button class="save-button">Save Changes</button>
                         <button class="delete-button">Delete</button>
                      </td>`;
    document.querySelector('#students-table tbody').appendChild(newRow);

    // Add event listener for the delete button
    let deleteButton = newRow.querySelector('.delete-button');
    deleteButton.addEventListener('click', function () {
        newRow.remove();
    });

    // Add event listener for the save button
    let saveButton = newRow.querySelector('.save-button');
    saveButton.addEventListener('click', function () {
        let newName = newRow.querySelector('.new-name').value;
        let newGrade = newRow.querySelector('.new-grade').value;
        let newUsername = newRow.querySelector('.new-username').value;
        let newPassword = newRow.querySelector('.new-password').value;
        let newPoints = newRow.querySelector('.new-points').value;
        let newCurrentPrize = newRow.querySelector('.new-currentPrize').value;
        let newAdmin = newRow.querySelector('.new-admin').checked;
        let studentData = getJSON("user.json");
        if (newAdmin) {
            newAdmin = true;
        } else if (!newAdmin) {
            newAdmin = false;
        }
        if (verifyAddStudent(newName, newGrade, newUsername, newPassword, newPoints, newAdmin, newCurrentPrize)) {
            let arr = [];
            //find a missing key value in between all the keys of studentData and make the new student have that key, or make the key the highest value
            for (i of studentData) {
                arr.push(i.key);
            }
            let keyToPush = [...Array(Math.max(...arr) + 1).keys()].filter(x => !arr.includes(x)).concat([Math.max(...arr) + 1])[0];
            studentData.push({ name: newName, grade: newGrade, username: newUsername, password: newPassword, points: parseInt(newPoints), currentPrize: newCurrentPrize, admin: newAdmin, key: keyToPush });
            uploadJSON(studentData, "user.json");
        }

        filter();
    });
}

function verifyAddStudent(name, grade, username, password, points, admin, currentPrize) {
    let users = getJSON("user.json");
    if (password.includes(" ")) {
        console.log("Password cannot contain spaces");
        return false;
    }
    if (password.length < 2) {
        console.log("Password is too short, try again");
        return false;
    }
    if (username < 2) {
        console.log("Username is too short, try again");
        return false;
    }
    for (let i = 0; i < users.length; i++)
        if (username == users[i].username) {
            console.log("Username is already included, try again");
            return false;
        }
    return true;
}


filter();