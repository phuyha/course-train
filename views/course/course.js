const { remote, ipcRenderer } = require('electron');
console.log(remote);
const $ = require('jquery');
const courseData = remote.require('./model/model.js');
// const windowSet = require('../lib/window-set');

//get user information from main.js
ipcRenderer.on('getUserInfo', (event, user) => {
    $('.profile').append('<h1>Welcome ' + user.fullname + '</h1>');
});

ipcRenderer.send('ready-get-user-info');


async function getAllCourses() {
    let data = await courseData.getCourses();
    return data;
}

$(document).ready(async () => {
    const courses = await getAllCourses();
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
                
            });
        }
    }
});

$('#logout-button').click(() => {
    // windowSet.openLogin();
});