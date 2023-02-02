

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
                         </td>
                         <td><button onclick="deletePrize(${i})">Delete</button></td>
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