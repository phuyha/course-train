const ipcRenderer = require('electron').ipcRenderer;
const userData = require('../db/objects/user.js');
const $ = require('jquery');
const url = require('url');
const path = require('path');

const thisWindow = require('electron').remote.getCurrentWindow();
async function getUsers() {
    let data = await userData.getAllUsers();
    return data;
}

$('#login-button').click(async () => {
    const username = $('#username').val();
    const password = $('#password').val();
    const arrayUsers = await getUsers();

    for (i = 0; i < arrayUsers.length; i++) {
        if (username === arrayUsers[i].username && password === arrayUsers[i].password) {
            if (arrayUsers[i].position === 'PM') {
                console.log("Login admin");
                ipcRenderer.send('userInfo', arrayUsers[i]);
                thisWindow.loadURL(url.format({
                    pathname: path.join(__dirname, '../views/admin.html'),
                    protocol: 'file',
                    slashes: true
                }));
            }

            else {
                console.log("Login user");

                thisWindow.loadURL(url.format({
                    pathname: path.join(__dirname, '../views/index-user.html'),
                    protocol: 'file',
                    slashes: true
                }));
            }
        }
    }
    console.log("Notification");
    $("#notification").css("display", "inline-block");

});

$('#register-button').click(() => {
    thisWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../views/register.html'),
        protocol: 'file',
        slashes: true
    }));
});
