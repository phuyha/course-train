const { ipcMain } = require('electron');
const windowSet = require('../lib/window-set.js');

// Event open course page
ipcMain.on('open-course', (event, user) => {
  windowSet.openCourse();
  windowSet.closeLogin();
  // Send user info to course page
  ipcMain.once('ready-get-user-info', (event) => {
    event.reply('get-user-info', user);
  });
});

// Event open course page
ipcMain.on('open-quiz', (event, courseId, user) => {
  windowSet.openQuiz();
  windowSet.closeCourse();
  // Send user info to course page
  ipcMain.once('ready-get-data', (event) => {
    event.reply('get-data', courseId, user);
  });
});

// Get event open register window
ipcMain.on('open-register', () => {
  windowSet.openRegister();
});

ipcMain.on('open-admin', (event, user) => {
  windowSet.openAdmin();
  windowSet.closeLogin();
});

// Get event open login window
ipcMain.on('open-login', () => {
  windowSet.openLogin();
});

module.exports = {
  windowSet: windowSet,
};