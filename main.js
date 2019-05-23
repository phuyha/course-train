// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const electron = require('electron');
const url = require('url');
const path = require('path');
const ipc = electron.ipcMain;
const dialog = electron.dialog;

const connectDb = require('./db/connect-db.js');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


function connectDatabase() {
  return connectDb.connection;
}

function createWindow() {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    fullscreenable: true,
    // titleBarStyle: 'hidden', 
    // frame: false ,
    // transparent: true, 
    title: "Course Train Application",
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './views/login.html'),
    protocol: 'file',
    slashes: true
  }));
  // mainWindow.setIgnoreMouseEvents(true)
  mainWindow.show()

  // get user object from login.js 
  ipc.on('userInfo', (event, user) => {
    console.log("=============================");
    event.sender.send('getUserInfo', user);
  });


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // Emitted when the window is closed.
  mainWindow.on('page-title-updated', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    console.log("Page-title-updated")
  })



  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    console.log('window dong roi ne huhu')
  })
}

ipc.on('course', (e, arg) => {
  ipc.loadURl("")
  console.log(arg);
});



// This method will be called when Electron has finished
app.on('ready', () => {
  connectDatabase();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
