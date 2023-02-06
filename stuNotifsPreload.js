const form = document.querySelector('form');
const fs = require('fs'); //json

form.addEventListener('submit', (event) => {
    event.preventDefault();
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
function getKeyFromName(name, file) {
    let x = getJSON(file);
    for (i of x)
        if (i.name == name)
            return i.key;
}
function getIndexFromKey(key, file) {
    let x = getJSON(file);
    for (let i = 0; i < x.length; i++) {
        if (x[i].key == key)
            return i;
    }
}

function filter() {
    let key1 = JSON.parse(localStorage.getItem('userObj')).key;
    document.querySelector('.user').innerHTML = "Name: " + getJSON('user.json')[getIndexFromKey(key1, 'user.json')].name;
    document.querySelector('.grade').innerHTML ="Grade: " + getJSON('user.json')[getIndexFromKey(key1, 'user.json')].grade;
    document.querySelector('.username').innerHTML ="Username: " + getJSON('user.json')[getIndexFromKey(key1, 'user.json')].username;
    document.querySelector('.password').innerHTML ="Password: " + getJSON('user.json')[getIndexFromKey(key1, 'user.json')].password;
    document.querySelector('.points').innerHTML ="Points: " + getJSON('user.json')[getIndexFromKey(key1, 'user.json')].points;
    document.querySelector('.currentPrize').innerHTML ="Current Prize: " + getJSON('user.json')[getIndexFromKey(key1, 'user.json')].currentPrize;

    let events = getJSON('events.json');
    for (let i = 0; i < events.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < events.length; j++) {
            if (events[j].limit < events[minIndex].limit) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [events[i], events[minIndex]] = [events[minIndex], events[i]];
        }
    }
    let filteredData = events;
    // Populate the table with the filtered data
    let tableBody = document.querySelector('#event-table tbody');
    tableBody.innerHTML = "";
    for (let i = 0; i < filteredData.length; i++) {
        let signUpVal = "Event is full";
        let key1 = JSON.parse(localStorage.getItem('userObj')).key;
        let user = getJSON('user.json')[getIndexFromKey(key1, 'user.json')];
        if (filteredData[i].limit > 0 && !user.pastEvents.includes(filteredData[i].event))
            signUpVal = `<td><input type = "button" onclick = "signUp(${filteredData[i].key})" value = "sign up"></td>`;
        let newRow = document.createElement('tr');
        newRow.innerHTML = `<td> ${filteredData[i].event} </td>
       <td> ${filteredData[i].eventType} </td>
       <td> ${filteredData[i].pointsGained} </td>
       <td> ${filteredData[i].limit} </td>
       ${signUpVal}`;
        tableBody.appendChild(newRow);
    }
    // let key1 = JSON.parse(localStorage.getItem('userObj')).key;
    let user = getJSON('user.json')[getIndexFromKey(key1, 'user.json')];
    // let log = document.querySelector('.log');
    let str = `You have attended a total of ${user.pastEvents.length} events`;
    if(user.pastEvents.length != 0)
        str += `, which include `;
    else str += `.`
    for (let i = 0; i < user.pastEvents.length; i++)
        if (i != user.pastEvents.length - 1)
            str += user.pastEvents[i] + ', ';
        else str += 'and ' + user.pastEvents[i] + '. ';
    // str = "test1";
    str += `You also got ${user.pastPrizes.length} prizes`;
    if(user.pastPrizes.length != 0)
        str += `, which include `;
        else str += `.`
    for (let i = 0; i < user.pastPrizes.length; i++)
        if (i != user.pastPrizes.length - 1)
            str += user.pastPrizes[i] + ', ';
        else str += 'and ' + user.pastPrizes[i] + '.';
    document.querySelector('.log').innerHTML = str;
}

function askMessage() {
    let message = document.querySelector('.message').value;
    let notifs = getJSON('notifications.json');
    let keyToPush = getKeyToPush(notifs);
    let key1 = JSON.parse(localStorage.getItem('userObj')).key;
    notifs.push({
        "type": "message",
        "name": getJSON('user.json')[getIndexFromKey(key1, 'user.json')].name,
        "message": message,
        "actions": [
            "delete",
            "reply",
            "read/unread"
        ],
        "read": false,
        "key": keyToPush
    });
    uploadJSON(notifs, 'notifications.json');
}

function askPrize() {
    let prizeName = document.querySelector('.prize').value;
    let message = document.querySelector('.message').value;
    let prizes = getJSON('prizes.json');
    let arr = [];
    for(i of prizes)
        arr.push(i.name);
    if(!arr.includes(prizeName)){
        console.log('Prize does not exist');
        return;
    }
    let notifs = getJSON('notifications.json');
    let keyToPush = getKeyToPush(notifs);
    let key1 = JSON.parse(localStorage.getItem('userObj')).key;
    notifs.push({
        "type": "prizeAssign",
        "name": getJSON('user.json')[getIndexFromKey(key1, 'user.json')].name,
        "prizeName": prizeName,
        "message": message,
        "actions": [
            "delete",
            "reply",
            "givePrize",
            "removePrize",
            "read/unread"
        ],
        "read": false,
        "key": keyToPush
    });
    uploadJSON(notifs, 'notifications.json');
}

function getKeyToPush(arr1) {
    let arr = [];
    for (i of arr1)
        arr.push(i.key);
    return [...Array(Math.max(...arr) + 1).keys()].filter(x => !arr.includes(x)).concat([Math.max(...arr) + 1])[0];
}

function askAdmin() {
    let notifs = getJSON('notifications.json');
    let key1 = JSON.parse(localStorage.getItem('userObj')).key;
    let message = document.querySelector('.message').value;
    notifs.push({
        "type": "adminPriveleges",
        "name": getJSON('user.json')[getIndexFromKey(key1, 'user.json')].name,
        "admin": getJSON('user.json')[getIndexFromKey(key1, 'user.json')].admin,
        "message": message,
        "actions": [
            "delete",
            "reply",
            "makeAdmin",
            "removeAdmin",
            "read/unread"
        ],
        "read": false,
        "key": getKeyToPush(notifs)
    });
    uploadJSON(notifs, 'notifications.json');
}

function askPoints() {
    let points = document.querySelector('.points').value;
    let message = document.querySelector('.message').value;
    let prizes = getJSON('prizes.json');
    let notifs = getJSON('notifications.json');
    let keyToPush = getKeyToPush(notifs);
    let key1 = JSON.parse(localStorage.getItem('userObj')).key;
    notifs.push({
        "type": "pointChange",
        "name": JSON.parse(localStorage.getItem('userObj')).name,
        "pointNum": points,
        "message": message,
        "actions": [
            "delete",
            "reply",
            "changePoints",
            "read/unread"
        ],
        "read": false,
        "key": keyToPush
    });
    uploadJSON(notifs, 'notifications.json');
}

function signUp(key) {
    let users = getJSON('user.json');
    let user = JSON.parse(localStorage.getItem('userObj'));
    user = getIndexFromKey(user.key, 'user.json');
    user = users.splice(user, 1);
    user = user[0];
    let events = getJSON('events.json');
    let event = getIndexFromKey(key, 'events.json');
    event = events.splice(event, 1);
    event = event[0];
    event.limit--;
    user.pastEvents.push(event.event);
    users.push(user);
    events.push(event);
    uploadJSON(users, 'user.json');
    uploadJSON(events, 'events.json');
    filter();
}