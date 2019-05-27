const electron = require('electron');
const ipc = electron.ipcRenderer
const eDialog = require('electron-dialogbox');
let $ = require('jquery');

var linkSelected;



const { remote } = require('electron');
const mysql = require('../../model/model.js');
mysql.initialize();

const currWindow = remote.getCurrentWindow();


remote.getCurrentWindow().openDevTools();

const btnSearch = $(".search")
btnSearch.click(async (e) => {
    e.preventDefault();

    currWindow.setEnabled(false);
    let result = await eDialog.showDialog(

        'file:///' + __dirname + '/eDialog/edit/editCourse.html',
        {
            width: 500,
            height: 800,
        },
        'simple dialog diaplaying test.',
    );


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

})

function getListCorrectId(listCorrect) {
    const listCorrectId = listCorrect.split(",");
    return listCorrectId;
}

function checkAnswerIsCorrectId(listCorrectId, id) {
    for (i = 0; i < listCorrectId.length; i++) {
        if (id == listCorrectId[i]) {
            return true;
        }
    }
    return false;
}

// Load all data when window load
window.onload = async function (e) {
    let allCourses = await mysql.getAllCourses();
    let allAnswers = await mysql.getAllAnswers();
    let allQuestions = await mysql.getAllQuestions();

    loadTable('#div-course', allCourses);
    loadTable("#div-question", allQuestions);
    loadTable("#div-answer", allAnswers);

    // Add event
    $(".a-href").bind('click', handleAddEdit);
    async function handleAddEdit(e) {
        // Get link current href target
        let href = e.target.href;

        // Get row to delete
        let rowDelete = e.target.parentElement.parentElement

        // Get event click href
        let event = href.split("#")[1].split("?")[0];
        let id = href.split("?id=")[1];

        if (event === 'delete') {
            if (linkSelected == "answers") {
                let resultConfirm;

                let getAnswerById = await mysql.getAnswerById(id);

                let questionId = getAnswerById[0].questionId;

                let questionById = await mysql.getQuestionById(questionId);


                if (questionById.length > 0) {
                    let correctId = questionById[0].correctId
                    console.log(correctId)
                    let listCorrectId = getListCorrectId(correctId);

                    console.log(listCorrectId)
                    if (checkAnswerIsCorrectId(listCorrectId, getAnswerById[0].id)) {
                        resultConfirm = getResultConfirmDialog("It's correct answer, You can't delete this answer");
                    } else {
                        resultConfirm = getResultConfirmDialog("Do you want to delete ?");
                        if (resultConfirm) {
                            await mysql.deleteByID(linkSelected, id);
                            rowDelete.remove();

                            console.log("OK")
                        } else {
                            console.log("NO")
                        }
                    }
                } else {
                    const resultConfirm = getResultConfirmDialog("Do you want to delete ?");
                    if (resultConfirm) {
                        await mysql.deleteByID(linkSelected, id);
                        rowDelete.remove();

                        console.log("OK")
                    } else {
                        console.log("NO")
                    }
                }

            } else {
                const resultConfirm = getResultConfirmDialog("Do you want to delete ?");

                if (resultConfirm) {
                    await mysql.deleteByID(linkSelected, id);
                    rowDelete.remove();
                    console.log("OK")
                } else {
                    console.log("NO")
                }
            }



        } else if (event === 'edit') {
            e.preventDefault();

            currWindow.setEnabled(false);


            let result;
            if (linkSelected === "courses") {
                const courseByID = await mysql.getCourseByID(id);
                result = await eDialog.showDialog(
                    'file:///' + __dirname + '/eDialog/edit/editCourse/editCourse.html',
                    {
                        width: 600,
                        height: 700,
                    },
                    courseByID,
                );
            } else if (linkSelected === "questions") {
                const questionById = await mysql.getQuestionById(id);
                const arrAnswerByQId = await mysql.getAllAnswerByQuestionId(id);

                result = await eDialog.showDialog(
                    'file:///' + __dirname + '/eDialog/edit/editQuestion/editQuestion.html',
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
                const questionById = await mysql.getQuestionById(answerByID[0].questionId);

                result = await eDialog.showDialog(
                    'file:///' + __dirname + '/eDialog/edit/editAnswer/editAnswer.html',
                    {
                        width: 600,
                        height: 500,
                    },
                    {
                        answerByID,
                        questionById
                    }
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
                        }
                    }
                } else if (linkSelected == "questions") {
                    mysql.updateByID("questions", {
                        id: id,
                        category: result.category,
                        type: result.type,
                        content: result.content,
                        newCorrectId: result.newCorrectId,
                        courseId: result.courseId,
                    })

                    const questionRows = $('#div-question tr');

                    for (i = 1; i < [...questionRows].length; i++) {
                        const rowID = questionRows[i].querySelector('.question-id').innerHTML
                        const linkID = href.split("?id=")[1]
                        if (rowID == linkID) {
                            questionRows[i].querySelectorAll('td')[1].innerHTML = result.category;
                            questionRows[i].querySelectorAll('td')[2].innerHTML = result.type;
                            questionRows[i].querySelectorAll('td')[3].innerHTML = result.content;
                            questionRows[i].querySelectorAll('td')[4].innerHTML = result.newCorrectId;
                        }
                    }

                } else {
                    mysql.updateByID("answers", {
                        id: result.id,
                        questionId: result.questionId,
                        content: result.content,
                    })

                    const answerRows = $('#div-answer tr');

                    for (i = 1; i < [...answerRows].length; i++) {
                        const rowID = answerRows[i].querySelector('.answer-id').innerHTML
                        const linkID = href.split("?id=")[1]
                        if (rowID == linkID) {
                            answerRows[i].querySelectorAll('td')[1].innerHTML = result.content;
                            answerRows[i].querySelectorAll('td')[2].innerHTML = result.questionId;
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

        } else if (event === 'status') {
            e.preventDefault();

            const statusRow = $('#div-course tr');

            for (i = 1; i < [...statusRow].length; i++) {
                const rowID = statusRow[i].querySelector('.course-id').innerHTML
                const linkID = href.split("?id=")[1]


                if (rowID == linkID) {
                    // console.log(statusRow[i].querySelectorAll('td > a')[5])
                    let validElem = statusRow[i].querySelectorAll('td>a')[0];
                    if (validElem.innerHTML === 'No') {
                        mysql.updateValidCourseById({
                            valid: 1,
                            id: linkID
                        })

                        validElem.innerHTML =  'Yes';
                             
                    } else {
                        mysql.updateValidCourseById({
                            valid: 0,
                            id: linkID
                        })

                        validElem.innerHTML  = 'No';
                    }

                }
            }

            // mysql.updateByID("courses", {
            //     id: result.id,
            //     name: result.name,
            //     descript: result.descript,
            //     valid: result.valid,
            //     total_time: result.total_time
            // })

        }
    }

    $("#btn-add").click(async (e) => {
        e.preventDefault();

        currWindow.setEnabled(false);
        let result;
        const allCourse = await mysql.getAllCourses();
        const idOfLastAnswer = await mysql.getTop1AnswerDESC();
        const newIdAnswer = idOfLastAnswer[0].id;

        if (linkSelected === 'courses') {
            result = await eDialog.showDialog(

                'file:///' + __dirname + '/eDialog/add/addCourse/addCourse.html',
                {
                    width: 600,
                    height: 650,
                },
                allCourse,
            );

            if (result && result.action === 'ok') {
                console.log("Vao OK")
                // some procedures for 'OK' button clicked.
                const top1Course = await mysql.getTop1CourseDESC();
                let newIdCourse = top1Course[0].id;
                mysql.addCourse({
                    name: result.name,
                    descript: result.descript,
                    valid: result.valid,
                    total_time: result.total_time,
                })

                // Add new course into table
                const contentCourse = '<tr>'
                    + `<td class="course-id">${newIdCourse}</td>`
                    + `<td>${result.descript}</td>`
                    + `<td class="course-name">${result.name}</td>`
                    + `<td>${result.total_time}</td>`
                    + '<td>' + `<a href='#status?id=${newIdCourse}' class='a-href'>Status</a>` + '</td>'
                    + '<td>' + `<a href='#edit?id=${newIdCourse}' class='a-href'>Edit</a>` + '</td>'
                    + '<td>' + `<a href='#delete?id=${newIdCourse}' class='a-href'>Delete</a>` + '</td>'
                    + '</tr>'

                $("#table-course").append(contentCourse);
                $(".a-href").unbind('click', handleAddEdit);
                $(".a-href").bind('click', handleAddEdit);

                currWindow.setEnabled(true);
                currWindow.show();
            } else {
                console.log('Vao cancle')
                currWindow.setEnabled(true);
                currWindow.show();
            }
        } else if (linkSelected === 'questions' || linkSelected === 'answers') {
            result = await eDialog.showDialog(

                'file:///' + __dirname + '/eDialog/add/addQuestionAnswer/addQuestionAnswer.html',
                {
                    width: 700,
                    height: 650,
                },
                {
                    allCourse,
                    newIdAnswer
                }
            );

            //     console.log("Wait dialog close")
            if (result && result.action === 'ok') {
                // some procedures for 'OK' button clicked.
                const top1Question = await mysql.getTop1Question();
                const newId = top1Question[0].id + 1;

                mysql.addQuestion({
                    category: result.category,
                    type: result.type,
                    content: result.content,
                    newCorrectId: result.newCorrectId,
                    courseId: result.courseId,
                })

                // Add new question into table
                const contentQuestion = '<tr>'
                    + `<td class="question-id">${newId}</td>`
                    + `<td>${result.category}</td>`
                    + `<td>${result.type}</td>`
                    + `<td class="question-content">${result.content}</td>`
                    + `<td>${result.newCorrectId}</td>`
                    + `<td>${result.courseId}</td>`
                    + '<td>' + `<a href='#edit?id=${newId}' class='a-href'>Edit</a>` + '</td>'
                    + '<td>' + `<a href='#delete?id=${newId}' class='a-href'>Delete</a>` + '</td>'
                    + '</tr>'

                $("#table-question").append(contentQuestion);

                const top1Answer = await mysql.getTop1AnswerDESC();
                const newIdAnswer = top1Answer[0].id;

                for (i = 0; i < result.arrAnswer.length; i++) {
                    mysql.addAnswerByQuestionId(result.arrAnswer[i], newId);

                    let contentAnswer = '<tr>'
                        + `<td class='answer-id'>${newIdAnswer + i + 1}</td>`
                        + `<td class="answer-content">${result.arrAnswer[i]}</td>`
                        + `<td>${newId}</td>`
                        + '<td>' + `<a href='#edit?id=${newIdAnswer + i + 1}' class='a-href'>Edit</a>` + '</td>'
                        + '<td>' + `<a href='#delete?id=${newIdAnswer + i + 1}' class='a-href'>Delete</a>` + '</td>'
                        + '</tr>'

                    $("#table-answer").append(contentAnswer);
                }
                $(".a-href").unbind('click', handleAddEdit);
                $(".a-href").bind('click', handleAddEdit);

                currWindow.setEnabled(true);
                currWindow.show();
            } else {
                console.log('Vao cancle')
                currWindow.setEnabled(true);
                currWindow.show();
            }
        }
    });


}



// Load table with each data
function loadTable(tableID, arrData) {
    var content = "";
    // Set header
    if (tableID === '#div-course') {
        content += `<table id="table-course">`
            + '<tr>'
            + '<th class="td-1">ID</th>'
            + '<th class="td-2">Descript</th>'
            + '<th class="td-1">Name</th>'
            + '<th class="td-1">Total time</th>'
            + '<th></th>'
            + '<th></th>'
            + '<th></th>'
            + '</tr>'
    } else if (tableID === '#div-question') {
        content += `<table id="table-question">`
            + '<tr>'
            + '<th>ID</th>'
            + '<th>Category</th>'
            + '<th>Type</th>'
            + '<th>Content</th>'
            + '<th>Correct ID</th>'
            + '<th>Course ID</th>'
            + '<th></th>'
            + '<th></th>'
            + '</tr>'
    } else {
        content += `<table id="table-answer">`
            + '<tr>'
            + '<th>ID</th>'
            + '<th>Content</th>'
            + '<th>Question ID</th>'
            + '<th></th>'
            + '<th></th>'
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
                + `<td><a href='#status?id=${arrData[i].id}' class='a-href'>${arrData[i].valid === 0 ? 'No' : 'Yes'}</a>`
                + '<td>' + `<a href='#edit?id=${arrData[i].id}' class='a-href'>Edit</a>` + '</td>'
                + '<td>' + `<a href='#delete?id=${arrData[i].id}' class='a-href'>Delete</a>` + '</td>'
                + '</tr>'

        } else if (tableID === '#div-question') {
            content +=
                `<td class="question-id">${arrData[i].id}</td>`
                + `<td>${arrData[i].category}</td>`
                + `<td>${arrData[i].type}</td>`
                + `<td class="question-content">${arrData[i].content}</td>`
                + `<td>${arrData[i].correctId}</td>`
                + `<td>${arrData[i].courseId}</td>`
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
        let searchText = btnSearch.val().toLowerCase();

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
function getResultConfirmDialog(message) {
    var txt;
    var result = confirm(message);
    return result;
}



