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
    let key1 = JSON.parse(localStorage.getItem('userObj')).key;
    let user = getJSON('user.json')[getIndexFromKey(key1, 'user.json')];
    // let log = document.querySelector('.log');
    let str = `You have attended a total of ${user.pastEvents.length} events, which include `;
    for (let i = 0; i < user.pastEvents.length; i++)
        if (i != user.pastEvents.length - 1)
            str += user.pastEvents[i] + ', ';
        else str += 'and ' + user.pastEvents[i] + '. ';
        // str = "test1";
    str += `You also got ${user.pastPrizes.length} prizes, which include `;
    for (let i = 0; i < user.pastPrizes.length; i++)
        if (i != user.pastPrizes.length - 1)
            str += user.pastPrizes[i] + ', ';
        else str += 'and ' + user.pastPrizes[i] + '.';
    document.querySelector('.log').innerHTML = str;
}

function askMessage() {
    let message = document.querySelector('.message').value;
    let notifs = getJSON('notifications.json');
    let arr = [];
    for (i of notifs) {
        arr.push(i.key);
    }
    let keyToPush = [...Array(Math.max(...arr) + 1).keys()].filter(x => !arr.includes(x)).concat([Math.max(...arr) + 1])[0];
    notifs.push({
        "type": "message",
        "name": JSON.parse(localStorage.getItem('userObj')).name,
        "message": message,
        "actions": [
            "delete",
            "reply",
            "read/unread"
        ],
        "read": 'unread',
        "key": keyToPush
    });
    uploadJSON(notifs, 'notifs.json');
}

function askPrize() {
    let prizeName = document.querySelector(.prize).value;
    let prizes = ;
}

function askAdmin() {

}

function askPoints() {

}

function askEvent() {

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