const { app, BrowserWindow } = require('electron')
const path = require('path');
const fs = require('fs'); //json

const isDev = process.env.NODE_ENV !== 'development'; //check if admin or not
// const isDev = true;
const isMac = process.platform === 'darwin'; //checks if app is running on mac

function createWindow(htmlFile = 'login.html', preloadFile = "studentsPreload.js") {
   // Create the browser window.
   const win = new BrowserWindow({
      title: 'Title',
      width: isDev ? 976 : 655,
      height: 600,
      minHeight: 655,
      minWidth: 600,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         preload: `${__dirname}/${preloadFile}`
      }
   });
   if (isDev) {
      win.openDevTools();
   }
   // load the htmlFile of the app.
   win.loadFile(htmlFile)
}

app.whenReady().then(() => {
   createWindow();

   app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0)
         createWindow();
   });
});

//closes app on mac
app.on('window-all-closed', () => {
   if (!isMac) {
      app.quit();
   }
});
