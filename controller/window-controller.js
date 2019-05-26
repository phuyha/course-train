const { ipcMain } = require('electron');
const windowSet = require('../lib/window-set.js');

// Get user from login.js 
ipcMain.on('openCourse', (event, user) => {
  windowSet.openCourse();
  // get user information from main.js
  ipcMain.once('ready-get-user-info', () => {
    event.sender.send('getUserInfo', user);
  });
});

// Get event open register window
ipcMain.on('openRegister', (event, user) => {
  windowSet.openRegister();
});

ipcMain.on('openAdmin', (event, user) => {
  windowSet.openAdmin();
});

// Get event open login window
ipcMain.on('openLogin', (event, user) => {
  windowSet.openLogin();
});

module.exports = {
  windowSet: windowSet,
};