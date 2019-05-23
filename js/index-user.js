const $ = require('jquery');
const thisWindow = require('electron').remote.getCurrentWindow();
const url = require('url');
const path = require('path');
const courseData = require('../db/objects/course.js');
const ipcRenderer = require('electron').ipcRenderer;

// get user information from main.js
ipcRenderer.on('getUserInfo', (event, user) => {
    console.log("asdhakshdhaksda " + user);
    $('#navibar').append('<p>Welcome' + user.fullname + '</p>');
})

async function getCourses() {
    let data = await courseData.getAllCourses();
    return data;
}

$(document).ready(async () => {

    const arrayCourses = await getCourses();
    console.log(arrayCourses);
    for (i = 0; i < arrayCourses.length; i++) {
        if(arrayCourses[i].valid === 1) {
            $('#course-list').append('<li> <div class="card-front"> <h2><b>' + arrayCourses[i].name + '</b></h2> <p>' + arrayCourses[i].descript +'</p> </div> <div class="card-back"> <h2><b>Click here</b></h2> </div> <div class="all-content"> <h1>' + arrayCourses[i].name + '</h1> </div> </li>');
        }
    }
});

$('#logout-button').click(() => {
    thisWindow.loadURL(url.format({
        pathname: path.join(__dirname, '../views/login.html'),
        protocol: 'file',
        slashes: true
    }));
});