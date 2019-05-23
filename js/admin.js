const electron = require('electron');
const ipc = electron.ipcRenderer
const eDialog = require('electron-dialogbox');
let $ = require('jquery');

const mysql = require('../db/db.js');

var linkSelected;



const { remote } = require('electron');
const currWindow = remote.getCurrentWindow();

remote.getCurrentWindow().openDevTools();
const btnSearch = $(".search")
btnSearch.click(async (e) => {
    e.preventDefault();

    currWindow.setEnabled(false);
    let result = await eDialog.showDialog(

        'file:///' + __dirname + '/editCourse.html',
        {
            width: 400,
            height: 300,
        },
        'simple dialog diaplaying test.',
    );


    console.log(result);

    //     console.log("Wait dialog close")
    if (result === 'ok') {
        // some procedures for 'OK' button clicked.
        console.log("OK")
        currWindow.setEnabled(true);
        currWindow.show();
    } else {
        console.log('cancle')
        currWindow.setEnabled(true);
        currWindow.show();
    }

    console.log("Da vao remote search")
})

// Load all data when window load
window.onload = async function (e) {
    let allCourses = await mysql.getAllCourses();
    let allAnswers = await mysql.getAllAnswers();
    let allQuestions = await mysql.getAllQuestions();

    loadTable('#div-course', allCourses);
    loadTable("#div-question", allQuestions);
    loadTable("#div-answer", allAnswers);

    $(".a-href").click(async (e) => {
        console.log("No lai vao day lan nua")
        // Get link current href target
        let href = e.target.href;

        // Get row to delete
        let rowDelete = e.target.parentElement.parentElement

        // Get event click href
        let event = href.split("#")[1].split("?")[0];
        let id = href.split("?id=")[1];

        if (event === 'delete') {
            const resultConfirm = getResultConfirmDialog();

            if (resultConfirm) {
                await mysql.deleteByID(linkSelected, id);
                rowDelete.remove();
                console.log("OK")
            } else {
                console.log("NO")
            }
        } else if (event === 'edit') {
            e.preventDefault();

            currWindow.setEnabled(false);
            

            let result;
            if (linkSelected === "courses") {
                const courseByID = await mysql.getCourseByID(id);
                result = await eDialog.showDialog(
                    'file:///' + __dirname + '/editCourse.html',
                    {
                        width: 800,
                        height: 400,
                    },
                    courseByID,
                );
            } else if (linkSelected === "questions") {
                const questionById = await mysql.getQuestionById(id);
                const arrAnswerByQId = await mysql.getAllAnswerByQuestionId(id);
                console.log(questionById)
                console.log(arrAnswerByQId)
                result = await eDialog.showDialog(
                    'file:///' + __dirname + '/editQuestion.html',
                    {
                        width: 800,
                        height: 400,
                    },
                    {
                        questionById,
                        arrAnswerByQId
                    },
                );
            } else {
                const answerByID = await mysql.getAnswerByID(id);

                result = await eDialog.showDialog(
                    'file:///' + __dirname + '/editAnswer.html',
                    {
                        width: 800,
                        height: 400,
                    },
                    answerByID,
                );
            }

            // Check result when close dialog
            if (result && result.action === 'ok') {

                if (linkSelected == "courses") {
                    mysql.updateByID("courses", {
                        id: result.id,
                        name: result.name,
                        descript: result.descript,
                        valid: result.valid,
                        total_time: result.total_time
                    })

                    const courseRows = $('#div-course tr');
                    // For-of --- Loop over each row in table into div-course
                    for (i = 1; i < [...courseRows].length; i++) {
                        const rowID = courseRows[i].querySelector('.course-id').innerHTML
                        const linkID = href.split("?id=")[1]
                        if (rowID == linkID) {
                            courseRows[i].querySelectorAll('td')[1].innerHTML = result.descript;
                            courseRows[i].querySelectorAll('td')[2].innerHTML = result.name;
                            courseRows[i].querySelectorAll('td')[3].innerHTML = result.total_time;
                            courseRows[i].querySelectorAll('td')[4].innerHTML = result.valid;
                        }
                    }
                } else if (linkSelected == "questions") {
                    mysql.updateByID("questions", {
                        id: result.id,
                        name: result.name,
                        descript: result.descript,
                        valid: result.valid,
                        total_time: result.total_time
                    })





                } else {
                    mysql.updateByID("answers", {
                        id: result.id,
                        questionId: result.questionId,
                        content: result.content,
                    })

                    const answerRows = $('#div-answer tr');
                    console.log(result)
                    for (i = 1; i < [...answerRows].length; i++) {
                        const rowID = answerRows[i].querySelector('.answer-id').innerHTML
                        const linkID = href.split("?id=")[1]
                        if (rowID == linkID) {
                            // let content = "<tr>"
                            //     + `<td class="answer-id">${result.id}</td>`
                            //     + `<td class="answer-content">${result.content}</td>`
                            //     + `<td>${result.questionId}</td>`
                            //     + '<td>' + `<a href='#edit?id=${result.id}' class='a-href'>Edit</a>` + '</td>'
                            //     + '<td>' + `<a href='#delete?id=${result.id}' class='a-href'>Delete</a>` + '</td>'
                            //     + '</tr>'
                            // $(answerRows[i]).replaceWith(content)
                            answerRows[i].querySelectorAll('td')[1].innerHTML = result.content;
                            answerRows[i].querySelectorAll('td')[2].innerHTML = result.questionById;
                        }
                    }
                }

                currWindow.setEnabled(true);
                currWindow.show();
            } else {
                console.log('cancle')
                currWindow.setEnabled(true);
                currWindow.show();
            }

        }
    });
}

// Load table with each data
function loadTable(tableID, arrData) {
    var content;
    // Set header
    if (tableID === '#div-course') {
        content += "<table>"
            + '<tr>'
            + '<th>ID</th>'
            + '<th>Descript</th>'
            + '<th>Name</th>'
            + '<th>Total time</th>'
            + '<th>Valid</th>'
            + '</tr>'
    } else if (tableID === '#div-question') {
        content += "<table>"
            + '<tr>'
            + '<th>Category</th>'
            + '<th>Content</th>'
            + '<th>Correct ID</th>'
            + '<th>Course ID</th>'
            + '<th>ID</th>'
            + '<th>Type</th>'
            + '</tr>'
    } else {
        content += "<table>"
            + '<tr>'
            + '<th>ID</th>'
            + '<th>Content</th>'
            + '<th>Question ID</th>'
            + '</tr>'
    }

    for (i = 0; i < arrData.length; i++) {
        content += '<tr>'
        // Set data each table
        if (tableID === '#div-course') {
            content +=
                `<td class="course-id">${arrData[i].id}</td>`
                + `<td>${arrData[i].descript}</td>`
                + `<td class="course-name">${arrData[i].name}</td>`
                + `<td>${arrData[i].total_time}</td>`
                + `<td>${arrData[i].valid}</td>`
                + '<td>' + `<a href='#status?id=${arrData[i].id}' class='a-href'>Status</a>` + '</td>'
                + '<td>' + `<a href='#edit?id=${arrData[i].id}' class='a-href'>Edit</a>` + '</td>'
                + '<td>' + `<a href='#delete?id=${arrData[i].id}' class='a-href'>Delete</a>` + '</td>'
                + '</tr>'
        } else if (tableID === '#div-question') {
            content +=
                `<td>${arrData[i].category}</td>`
                + `<td class="question-content">${arrData[i].content}</td>`
                + `<td>${arrData[i].correctId}</td>`
                + `<td>${arrData[i].courseId}</td>`
                + `<td>${arrData[i].id}</td>`
                + `<td>${arrData[i].type}</td>`
                + '<td>' + `<a href='#edit?id=${arrData[i].id}' class='a-href'>Edit</a>` + '</td>'
                + '<td>' + `<a href='#delete?id=${arrData[i].id}' class='a-href'>Delete</a>` + '</td>'
                + '</tr>'
        } else {
            content +=
                `<td class='answer-id'>${arrData[i].id}</td>`
                + `<td class="answer-content">${arrData[i].content}</td>`
                + `<td>${arrData[i].questionId}</td>`
                + '<td>' + `<a href='#edit?id=${arrData[i].id}' class='a-href'>Edit</a>` + '</td>'
                + '<td>' + `<a href='#delete?id=${arrData[i].id}' class='a-href'>Delete</a>` + '</td>'
                + '</tr>'
        }
    }
    content += "</table>"
    $(tableID).append(content);
}

// Click Course
const linkCourse = $(".a-course");
linkCourse.click((e) => {
    e.preventDefault();
    linkSelected = "courses";

    document.querySelector("#div-course").style.display = "block";
    document.querySelector("#div-question").style.display = "none";
    document.querySelector("#div-answer").style.display = "none";

});

// Click Question
const linkQuestion = $(".a-question");
linkQuestion.click((e) => {
    e.preventDefault();
    linkSelected = "questions";

    document.querySelector("#div-course").style.display = "none";
    document.querySelector("#div-question").style.display = "block";
    document.querySelector("#div-answer").style.display = "none";

});


// Click Question
const linkAnswer = $(".a-answer");
linkAnswer.click((e) => {
    e.preventDefault();
    linkSelected = "answers";

    document.querySelector("#div-course").style.display = "none";
    document.querySelector("#div-question").style.display = "none";
    document.querySelector("#div-answer").style.display = "block";

});

// Key release input-search
$(document).ready(function () {
    const btnSearch = $("#input-search");
    btnSearch.keyup(async () => {
        btnSearch.css("background-color", "pink");
        let searchText = btnSearch.val().toLowerCase();
        console.log(searchText);

        if (linkSelected === 'courses') {
            const courseRows = $('#div-course tr');

            // For-of --- Loop over each row in table into div-course
            for (row of [...courseRows]) {
                // Check first row is header then continue
                if (!row.querySelector('.course-name')) continue;

                if (row.querySelector('.course-name').innerHTML.toLowerCase().includes(searchText)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        } else if (linkSelected === 'questions') {
            const questionRows = $('#div-question tr');

            // For-index
            for (i = 1; i < [...questionRows].length; i++) {
                if (questionRows[i].querySelector('.question-content').innerHTML.toLowerCase().includes(searchText)) {
                    questionRows[i].style.display = '';
                } else {
                    questionRows[i].style.display = 'none';
                }
            }
        } else {
            const questionRows = $('#div-answer tr');

            for (row of [...questionRows]) {
                if (!row.querySelector('.answer-content')) continue;

                if (row.querySelector('.answer-content').innerHTML.toLowerCase().includes(searchText)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        }
    });
});

// Get result confirm dialog
function getResultConfirmDialog() {
    var txt;
    var result = confirm("Do you want to delete ?");
    return result;
}





