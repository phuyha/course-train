const { BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

appWindow = {
    loginAppWindow: null,
    courseAppWindow: null,
    quizAppWindow: null,
    registerAppWindow: null,
    addminAppWindow: null
}

class Command {

    openLogin = () => {
        // Create the browser window.
        appWindow.loginAppWindow = new BrowserWindow({
            width: 960,
            height: 540,
            title: "Login Course Train Application",
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the login.html of the app.
        appWindow.loginAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/login/login.html'),
            protocol: 'file',
            slashes: true
        }));
        // appWindow.registerAppWindow.close();

    };

    openAdmin = () => {
        // Create the browser window.
        appWindow.addminAppWindow = new BrowserWindow({
            width: 960,
            height: 540,
            title: "Login Course Train Application",
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the login.html of the app.
        appWindow.addminAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/admin/admin.html'),
            protocol: 'file',
            slashes: true
        }));
        appWindow.loginAppWindow.close();

    }

    openCourse = () => {
        appWindow.courseAppWindow = new BrowserWindow({
            width: 960,
            height: 540,
            title: "Course Train Application",
            webPreferences: {
                nodeIntegration: true
            }
        });

        // and load the index.html of the app.
        appWindow.courseAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/course/course.html'),
            protocol: 'file',
            slashes: true
        }));

        appWindow.loginAppWindow.close();
    };

    openQuiz = () => {
        appWindow.quizAppWindow = new BrowserWindow({
            width: 960,
            height: 540,
            title: "Course Train Application",
            webPreferences: {
                nodeIntegration: true
            }
        });

        appWindow.quizAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/quiz.html'),
            protocol: 'file',
            slashes: true
        }));

        appWindow.courseAppWindow.close();
    };

    openRegister = () => {
        appWindow.registerAppWindow = new BrowserWindow({
            width: 1060,
            height: 540,
            title: "Register Course Train Application",
            webPreferences: {
                nodeIntegration: true
            }
        });

        appWindow.registerAppWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../views/register/register.html'),
            protocol: 'file',
            slashes: true
        }));

        appWindow.loginAppWindow.close();
    };
}

const cmd = new Command();

module.exports = cmd;



