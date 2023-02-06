const form = document.querySelector('form');
const { pushNotifications } = require('electron');
const fs = require('fs'); //json
const { DefaultDeserializer } = require('v8');

form.addEventListener('submit', (event) => {
   event.preventDefault();
   displayNotifs();
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

function markAllAsRead() {
   let notifs = getJSON('notifications.json');
   for (i of notifs)
      i.read = true;
   uploadJSON(notifs, 'notifications.json');
}

function markAllAsUnread() {
   let notifs = getJSON('notifications.json');
   for (i of notifs)
      i.read = false;
   uploadJSON(notifs, 'notifications.json');
}



function checkAll() { //not html
   checkedArr = [];
   let notifications = getJSON("notifications.json");
   for (user of notifications)
      checkedArr.push(user.key);
   displayNotifs();
}

function clearAllChecked() { //not html
   checkedArr = [];
   displayNotifs();
}

//all the different types of notifications and actions to do with them
/*
Ask for prize- Name, points, message, actions- delete, assignPrize, reply, read/unread
Ask for event assignment- Name, eventName, message, action to do, actions- delete, giveEvent, removeEvent, reply, read/unread
Ask for admin priveleges- Name, message, actions- delete, makeAdmin, reply, read/unread, removeAdmin
Message- Name, message, actions- delete, reply, read/unread
Change number of points- Name, points, message- delete, changePoints, reply, read/unread
*/
var checkedArr = [];

function verifyChecked(key, index) {
   if (document.querySelector(`.checked${index}`).checked)
      checkedArr.push(key);
   else
      for (let i = 0; i < checkedArr.length; i++)
         if (checkedArr[i] == key)
            checkedArr.splice(i, 1);
   console.log(checkedArr);
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
   return -1;
}

function readUnread(key) {
   let notifs = getJSON("notifications.json");
   let i = getIndexFromKey(key, "notifications.json");
   if (notifs[i].read)
      notifs[i].read = false;
   else notifs[i].read = true;
   uploadJSON(notifs, "notifications.json");
   console.log('done?');
   displayNotifs();
}

function deleteNotif(key) {
   // Code to delete a notification
   let notifs = getJSON("notifications.json");
   let x = getIndexFromKey(key, "notifications.json");
   notifs.splice(x, 1);
   console.log(notifs);
   uploadJSON(notifs, "notifications.json");
   displayNotifs();
}

function deleteNotifications() { 
   let notifs = getJSON('notifications.json');
   console.log(checkedArr)
   for (let i = 0; i < notifs.length; i++)
      if (checkedArr.includes(notifs[i].key)) {
         // console.log(notifs.splice(i, 1));
         notifs.splice(i, 1);
         console.log(notifs[i].key);
      }
   // console.log(notifs);
   uploadJSON(notifs, 'notifications.json');
   displayNotifs();
}

function reply() {
   // Code to reply to a notification
   alert("Reply function not yet implemented");
}

function givePrize(key) {
   let notifs = getJSON("notifications.json");
   let notifsIndex = getIndexFromKey(key, "notifications.json");
   let users = getJSON("user.json");
   let usersIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].name, "user.json"), "user.json");
   users[usersIndex].currentPrize = notifs[notifsIndex].prizeName;
   // console.log(users[usersIndex].currentPrize);
   uploadJSON(users, 'user.json');
   displayNotifs();
}

function removePrize(key) {
   let notifs = getJSON("notifications.json");
   let notifsIndex = getIndexFromKey(key, "notifications.json");
   let users = getJSON("user.json");
   let usersIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].name, "user.json"), "user.json");
   users[usersIndex].currentPrize = "None";
   // console.log(users[usersIndex].currentPrize);
   uploadJSON(users, 'user.json');
   displayNotifs();
}

function giveEvent(key) {
   let notifs = getJSON("notifications.json");
   let notifsIndex = getIndexFromKey(key, "notifications.json");
   let users = getJSON("user.json");
   let usersIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].name, "user.json"), "user.json");
   let event = getJSON("events.json");
   let eventIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].eventName, "events.json"), "events.json");
   let points = event[eventIndex].pointsGained;
   users[usersIndex].points += points;
   // console.log(users[usersIndex].points);
   uploadJSON(users, 'user.json');
   displayNotifs();
}

function removeEvent(key) {
   let notifs = getJSON("notifications.json");
   let notifsIndex = getIndexFromKey(key, "notifications.json");
   let users = getJSON("user.json");
   let usersIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].name, "user.json"), "user.json");
   let event = getJSON("events.json");
   let eventIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].eventName, "events.json"), "events.json");
   let points = event[eventIndex].pointsGained;
   users[usersIndex].points -= points;
   // console.log(users[usersIndex].points);
   uploadJSON(users, 'user.json');
   displayNotifs();
}

function makeAdmin(key) {
   let notifs = getJSON("notifications.json");
   let notifsIndex = getIndexFromKey(key, "notifications.json");
   let users = getJSON("user.json");
   let usersIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].name, "user.json"), "user.json");
   users[usersIndex].admin = true;
   // console.log(users[usersIndex].admin);
   uploadJSON(users, 'user.json');
   displayNotifs();
}

function removeAdmin(key) {
   let notifs = getJSON("notifications.json");
   let notifsIndex = getIndexFromKey(key, "notifications.json");
   let users = getJSON("user.json");
   let usersIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].name, "user.json"), "user.json");
   users[usersIndex].admin = false;
   // console.log(users[usersIndex].admin);
   uploadJSON(users, 'user.json');
   displayNotifs();
}

function changePoints(key) {
   let notifs = getJSON("notifications.json");
   let notifsIndex = getIndexFromKey(key, "notifications.json");
   let users = getJSON("user.json");
   let usersIndex = getIndexFromKey(getKeyFromName(notifs[notifsIndex].name, "user.json"), "user.json");
   users[usersIndex].points = notifs[notifsIndex].pointNum;
   // console.log(users[usersIndex].points);
   uploadJSON(users, 'user.json');
   displayNotifs();
}

function displayNotifs() {
   let notifs = getJSON("notifications.json");
   let tableBody = document.querySelector('#notifications-table');
   tableBody.innerHTML = "<tr><th>check</th><th>Name</th><th>Message</th><th>Misc</th><th>Actions</th><th>Read/unread</th></tr>";

   //    let x = "checked";
   for (let i = 0; i < notifs.length; i++) {
      let x;
      if (checkedArr.includes(notifs[i].key)) {
         x = "checked";
      } else {
         x = "";
      }
      let row = `<tr><td><input class ="checked${i}" contenteditable = "true" type = "checkbox" onchange = "verifyChecked(${notifs[i].key}, ${i})" ${x}></td><td>Name: ${notifs[i].name}</td><td>Message: ${notifs[i].message}</td>`;
      let buttons = `<td>
      <!--<button onclick="readUnread(${notifs[i].key})">read/unread</button>-->
      <button onclick="deleteNotifications(${notifs[i].key})">Delete</button>
      <button onclick="reply(${notifs[i].key})">reply</button>`;
      if (notifs[i].type == "prizeAssign") {
         row += `
         <td>Prize name: ${notifs[i].prizeName}</td>
         ${buttons}
         <button onclick="givePrize(${notifs[i].key})">give prize</button>
         <button onclick="removePrize(${notifs[i].key})">remove prize</button>
         </td>`;
      } else if (notifs[i].type == "eventAssign") {
         row += `
         <td>Event name: ${notifs[i].eventName}</td>
         ${buttons}
         <button onclick="giveEvent(${notifs[i].key})">give event</button>
         <button onclick="removeEvent(${notifs[i].key})">remove event</button>
         </td>`;
      } else if (notifs[i].type == "adminPriveleges") {
         row += `
         <td>Admin: ${notifs[i].admin}</td>
         ${buttons}
         <button onclick="makeAdmin(${notifs[i].key})">make admin</button>
         <button onclick="removeAdmin(${notifs[i].key})">remove admin</button>
         </td>`;
      } else if (notifs[i].type == "pointChange") {
         row += `
         
         <td>Points: ${notifs[i].pointNum}</td>
         ${buttons}
         <button onclick="changePoints(${notifs[i].key})">change points</button>
         </td>
      `;
      } else if (notifs[i].type == "message") {
         row += `
         
         <td></td>
         ${buttons}
         </td>
      `;
        }
        if (notifs[i].read)
            row += `<td>Read</td>`;
        else
            row += `<td>Unread</td>`;
        row += `<tr></tr>`;
        tableBody.innerHTML += row;
    }
}


displayNotifs();