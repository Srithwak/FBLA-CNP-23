const form = document.querySelector('form');
const fs = require('fs'); //json

form.addEventListener('submit', (event) => {
   event.preventDefault();
   filter();
   filterPrizes();
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

function addEvent() {
   // Create a new row in the table
   let newRow = document.createElement('tr');
   newRow.innerHTML = `<td><input type="text" class="new-name"></td>
                      <td>
                        <input type="radio" name="new-eventType" value="sports">Sports
                        <input type="radio" name="new-eventType" value="nonSports">Non-Sports
                      </td>
                      <td><input type="number" min="0" class="new-pointsGained"></td>
                      <td><input type="number" min="0" class="new-limit"></td>
                      <td><button onclick="saveChanges()">Save Changes</button>
                      <button onclick="deleteEvent()">Delete</button></td>`;
   document.querySelector('#event-table tbody').appendChild(newRow);
}

function deleteEvent(index) {
   // Delete the event from the JSON file
   let eventData = getJSON("events.json");
   eventData.splice(index, 1);
   uploadJSON(eventData, "events.json");

   // Reload the table
   filter();
}

function cancelChanges() {
   // Reload the table to discard the changes
   filter();
}

// function saveChanges(index) {
//    let events = getJSON("events.json");
//    let tr = document.querySelector(`tr[data-index='${index}']`);
//    let eventName = tr.querySelector("td:nth-child(1)").textContent;
//    let eventType = tr.querySelector("td:nth-child(2)").textContent;
//    let pointsGained = tr.querySelector("td:nth-child(3)").textContent;
//    let limit = tr.querySelector("td:nth-child(4)").textContent;

//    events[index].event = eventName;
//    events[index].eventType = eventType;
//    events[index].pointsGained = pointsGained;
//    events[index].limit = limit;

//    uploadJSON(events, "events.json");
//    filter();
// }

function saveChanges(index) { //the whole function doesn't work
   let eventData = getJSON("events.json");
   if (index === undefined) {
      // For new prize addition
      let tr = document.querySelector(`tr[data-index='${index}']`);
      let eventName = tr.querySelector("td:nth-child(1)").textContent;
      let eventType = tr.querySelector("td:nth-child(2)").textContent;
      let pointsGained = tr.querySelector("td:nth-child(3)").textContent;
      let limit = tr.querySelector("td:nth-child(4)").textContent;
      if (eventName && eventType && pointsGained) {
         let newPrize = { event: eventName, eventType: eventType, pointsGained: pointsGained, limit: limit };
         eventData.push(newPrize);
         uploadJSON(eventData, "events.json");
      } else {
         console.log("Please fill in all the fields!")
      }
   } else {
      // For existing prize update
      let eventName = document.querySelector(`#event-table tbody tr:nth-child(${index + 1}) td:nth-child(1)`).innerHTML;
      let eventType = document.querySelector(`#event-table tbody tr:nth-child(${index + 1}) td:nth-child(2)`).innerHTML;
      let pointsGained = document.querySelector(`#event-table tbody tr:nth-child(${index + 1}) td:nth-child(3)`).innerHTML;
      let limit = document.querySelector(`#event-table tbody tr:nth-child(${index + 1}) td:nth-child(4)`).innerHTML; //limit is undefined only problem
      eventData[index].event = eventName;
      eventData[index].eventType = eventType;
      eventData[index].pointsGained = parseInt(pointsGained);
      eventData[index].limit = parseInt(limit);
      uploadJSON(eventData, "events.json");
   }
   filter();
}

function filter() {
   let name = document.querySelector(".name").value;
   let sportsEvent = document.querySelector(".sportsEvent").checked;
   let nonSportsEvent = document.querySelector(".nonSportsEvent").checked;
   let pointsGained = document.querySelector(".pointsGained").value;
   let limit = document.querySelector(".limit").value;
   let type;
   if (sportsEvent) {
      type = "sports";
   } else if (nonSportsEvent) {
      type = "nonSports";
   }
   let events = getJSON("events.json");
   let tmp = [];
   for (i of events) {
      tmp.push(i.event);
   }
   let p = tmp.filter(i => i.includes(name));
   let filteredData = [];
   for (let i = 0; i < events.length; i++) {
      if (p.includes(events[i].event)) {
         filteredData.push(events[i]);
      }
   }
   if (type != null) {
      events = filteredData;
      tmp = [];
      filteredData = [];
      //check if event has the same type, is yes then push
      for (let i = 0; i < events.length; i++) {
         if (events[i].eventType == type)
            filteredData.push(events[i]);
      }
   }


   if (pointsGained != null && pointsGained != "" && pointsGained != 0) {
      events = filteredData;
      tmp = [];
      filteredData = [];
      //check if event has the same pointsGained, is yes then push
      for (let i = 0; i < events.length; i++) {
         if (events[i].pointsGained == pointsGained)
            filteredData.push(events[i]);
      }
   }

   if (limit != null && limit != "" && limit != 0) {
      events = filteredData;
      tmp = [];
      filteredData = [];
      //check if event has the same limit, is yes then push
      for (let i = 0; i < events.length; i++) {
         if (events[i].limit == limit)
            filteredData.push(events[i]);
      }
   }


   // Populate the table with the filtered data
   let tableBody = document.querySelector('#event-table tbody');
   tableBody.innerHTML = "";
   for (let i = 0; i < filteredData.length; i++) {
      let newRow = document.createElement('tr');
      newRow.innerHTML = `<td contenteditable ="true" > ${filteredData[i].event} </td>
      <td contenteditable ="true" > ${filteredData[i].eventType} </td>
      <td contenteditable ="true" > ${filteredData[i].pointsGained} </td>
      <td contenteditable ="true" > ${filteredData[i].limit} </td>
      <td><button onclick="saveChanges(${i})">Save Changes</button>
      <button onclick="cancelChanges()">Cancel</button>
      <button onclick="deleteEvent(${i})">Delete</button></td>`;
      tableBody.appendChild(newRow);
   }
}



function filterPrizes() {
    let name = document.querySelector(".name1").value;
    let type = document.querySelector(".type1").value;
    let points = document.querySelector(".points1").value;
    let filteredData = getJSON("prizes.json");
 
    if (name != null && name != "") {
       filteredData = filteredData.filter(i => i.name1.includes(name));
    }
    if (type != null && type != "") {
       filteredData = filteredData.filter(i => i.type1.includes(type));
    }
    if (points != null && points != "" && points != 0) {
       filteredData = filteredData.filter(i => i.points1 <= points); //does not work properly
    }
 
    document.querySelector('#Prizes-table tbody').innerHTML = "";
    for (let i = 0; i < filteredData.length; i++) {
       let prize = filteredData[i];
       let row = `<tr>
                          <td contenteditable="true">${prize.name}</td>
                          <td contenteditable="true">${prize.type}</td>
                          <td contenteditable="true">${prize.points}</td>
                          <td><button onclick="saveChangesPrizes(${i})">Save</button>
                              <button onclick="cancelChangesPrize(${i})">Cancel</button>
                              <button onclick="deletePrize(${i})">Delete</button>
                          </td>
                          
                      </tr>`;
       document.querySelector('#Prizes-table tbody').innerHTML += row;
    }
 }
 
 function addPrize() {
    // Create a new row in the table
    let newRow = document.createElement('tr');
    newRow.innerHTML = `<td><input type="text" class="new-name1"></td>
                       <td><input type="text" class="new-type1"></td>
                       <td><input type="number" min="0" class="new-points1"></td>
                       <td>
                          <button class="save-button">Save Changes</button>
                          <button class="delete-button">Delete</button>
                       </td>`;
    document.querySelector('#Prizes-table tbody').appendChild(newRow);
 
    // Add event listener for the delete button
    let deleteButton = newRow.querySelector('.delete-button');
    deleteButton.addEventListener('click', function () {
       newRow.remove();
    });
 
    // Add event listener for the save button
    let saveButton = newRow.querySelector('.save-button');
    saveButton.addEventListener('click', function () {
       let newName = newRow.querySelector('.new-name1').value;
       let newType = newRow.querySelector('.new-type1').value;
       let newPoints = newRow.querySelector('.new-points1').value;
 
       let prizeData = getJSON("prizes.json");
       let key = 0;
          let tmpArr = [];
          //find a missing key value in between all the keys of prizes and make the new student have that key, or make the key the highest value
          for (i of prizeData) {
             tmpArr.push(i.key);
          }
          tmpArr.sort((a, b) => a - b);
          for (let i = 1; i < tmpArr.length - 1; i++)
             if ((tmpArr[i] - tmpArr[i + 1]) > 1) {
                key = tmpArr[i] + 1;
                break;
             }
       prizeData.push({ name: newName, type: newType, points: newPoints, key:key });
       uploadJSON(prizeData, "prizes.json");
 
       filterPrizes();
    });
 }
 
 
 function cancelChangesPrize(index) {
    // Reload the table to discard the changes
    filterPrizes();
 }
 
 function deletePrize(index) {
    // Delete the prize from the JSON file
    let prizeData = getJSON("prizes.json");
    prizeData.splice(index, 1);
    // fs.writeFileSync("prizes.json", JSON.stringify(prizeData));
    uploadJSON(prizeData, "prizes.json");
 
    // Reload the table
    filterPrizes();
 }
 
 function saveChangesPrizes(index) {
    let prizeData = getJSON("prizes.json");
    if (index === undefined) {
       // For new prize addition
       let newName = document.querySelector('.new-name1').value;
       let newType = document.querySelector('.new-type1').value;
       let newPoints = document.querySelector('.new-points1').value;
       if (newName && newType && newPoints) {
          let newPrize = { name: newName, type: newType, points: newPoints };
          prizeData.push(newPrize);
          uploadJSON(prizeData, "prizes.json");
       } else {
          console.log("Please fill in all the fields!");
       }
    } else {
       // For existing prize update
       let newName = document.querySelector(`#Prizes-table tbody tr:nth-child(${index + 1}) td:nth-child(1)`).innerHTML;
       let newType = document.querySelector(`#Prizes-table tbody tr:nth-child(${index + 1}) td:nth-child(2)`).innerHTML;
       let newPoints = document.querySelector(`#Prizes-table tbody tr:nth-child(${index + 1}) td:nth-child(3)`).innerHTML;
       prizeData[index].name = newName;
       prizeData[index].type = newType;
       prizeData[index].points = parseInt(newPoints);
       uploadJSON(prizeData, "prizes.json");
    }
    filterPrizes();
 }

filter();
filterPrizes();