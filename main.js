// Modules to control application life and create native browser window
const { app, ipcMain } = require('electron');

app.on('ready', () => {
  
});

// get user object from login.js 
ipcMain.on('userInfo', (event, user) => {
  ipcMain.once('ready-get-user-info', () => {
    event.sender.send('getUserInfo', user);
  });
});

