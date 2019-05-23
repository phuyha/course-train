const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

appWindow = {
    loginAppWindow = null,
    courseAppWindow = null,
    quizAppWindow = null
}

class Command {
    loginWindow = () => {
        // Create the browser window.
        appWindow.loginAppWindow = new BrowserWindow({
            width: 700,
            height: 500,
            title: "Login Course Train Application",
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the index.html of the app.
        appWindow.courseAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, './views/login.html'),
        }));
        // appWindow.courseAppWindow.show();
    };

    courseWindow = () => {
        appWindow.courseAppWindow = new BrowserWindow({
            
        });
    };

}



