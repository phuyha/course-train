const $ = require('jquery');
const thisWindow = require('electron').remote.getCurrentWindow();
const url = require('url');
const path = require('path');
const courseData = require('../db/objects/course.js');
const ipcRenderer = require('electron').ipcRenderer;

let currentUser;

// get user information from main.js
ipcRenderer.on('getUserInfo', (event, user) => {
    currentUser = user;
    $('.profile').append('<h1>Welcome ' + user.fullname + '</h1>');
});

ipcRenderer.send('ready-get-user-info');

async function getCourses() {
    let data = await courseData.getAllCourses();
    return data;
}

$(document).ready(async () => {
    const courses = await getCourses();
    for (const course of courses) {
        if (course.valid === 1) {
            $('#course-list').append( `
            <li id='${course.id}'>
                <div class="card-front">
                    <h2>
                        <b> ${course.name}</b>
                    </h2> 
                    <p>${course.descript}</p>
                </div>
                <div class="card-back">
                    <h2>
                        <b>Click here</b>
                    </h2>
                </div>
                <div class="all-content">
                    <h1> ${course.name} </h1>
                </div>
            </li>`);
            // li.dataset.id = course.id;
            $(`#${course.id}`).click((event) => {
                console.log(course.id);
                
                // thisWindow.loadURL(url.format({
                //     pathname: path.join(__dirname, '../views/quiz.html'),
                //     protocol: 'file',
                //     slashes: true
                // }));
            });
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