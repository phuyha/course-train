const { remote, ipcRenderer } = require('electron');
const $ = require('jquery');
const courseData = remote.require('./model/model.js');
const windowSet = remote.require('./lib/window-set.js');

ipcRenderer.send('ready-get-user-info');

let currentUser = {};

//get user information from main.js
ipcRenderer.on('get-user-info', (event, user) => {
    $('.profile').append('<h1>Welcome ' + user.fullname + '</h1>');
    currentUser = user;
});

async function getAllCourses() {
    let data = await courseData.getCourses();
    return data;
}

async function getPassedCourses(userId) {
    let data = await courseData.getUserPassedCourses(userId);
    return data;
}

$(document).ready(async () => {
    const courses = await getAllCourses();
    for (const course of courses) {
        if (course.valid === 1) {
            $('#course-list').append(`
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
            $(`#${course.id}`).click((event) => {
                console.log(course.id);
                console.log(currentUser);
                ipcRenderer.send('open-quiz', course.id, currentUser);
            });
        }
    }
});

$('#logout-button').click(() => {
    windowSet.openLogin();
    windowSet.closeCourse();
});