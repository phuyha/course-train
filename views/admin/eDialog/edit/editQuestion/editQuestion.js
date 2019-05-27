// const mysql = require('../db/db.js');
// const $ = require('jquery');

const args = dialog.argument;

document.querySelector("#id-questions").value = args.questionById[0].id;
document.querySelector("#category-questions").placeholder = args.questionById[0].category;
document.querySelector("#content-questions").placeholder = args.questionById[0].content;
document.querySelector("#courseId-questions").placeholder = args.questionById[0].courseId;

// Get list correct ID 
function getListCorrectId() {
    const correctId = args.questionById[0].correctId;
    const listCorrectId = correctId.split(",");
    return listCorrectId;
}

// Load checkbox with CorrectId is checked
for (i = 0; i < args.arrAnswerByQId.length; i++) {
    var d1 = document.getElementById('input');
    const listCorrectId = getListCorrectId();
    d1.insertAdjacentHTML('beforeend', `<input id=${i} type="checkbox" name="correctId" value="${i}">${args.arrAnswerByQId[i].content}</input></br>`);

    for (j = 0; j < listCorrectId.length; j++) {
        if (listCorrectId[j] == (i + 1)) {
            document.getElementById(`${i}`).checked = true;
        } 
    } 
}
d1.insertAdjacentHTML('beforeend', `<span id="corectId_error_msg"></span>`);

// Validate input field
function validate(category, content) {
    // Check valid name
    if (!category) {
        resetErrorMessage();
        document.querySelector('#category_error_msg').innerHTML = "Please enter category";
        document.querySelector('#category-questions').focus();
        document.querySelector('#category_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#category_error_msg').style.display = "none";
    }

    // Check valid descript
    if (!content) {
        resetErrorMessage();
        document.querySelector('#content_error_msg').innerHTML = "Please enter content";
        document.querySelector('#content-questions').focus();
        document.querySelector('#content_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#content_error_msg').style.display = "none";
    }

    const listCheckBox = document.querySelectorAll("input[type='checkbox']");

    let countCorrectId = 0;
    for(i = 0; i < listCheckBox.length; i++) {
        if (listCheckBox[i].checked == true) {
            countCorrectId++;
        }
    }
    
    // Check select single correctId and don't select any checkbox
    if (document.querySelector("#type-questions").value == 0) {
        if (countCorrectId > 1 || countCorrectId == 0) {
            document.querySelector('#corectId_error_msg').innerHTML = "Please choose single answer";
            return false;
        } 
    } else if (document.querySelector("#type-questions").value == 1) {
        if (countCorrectId < 2 || countCorrectId == 0) {
            document.querySelector('#corectId_error_msg').innerHTML = "Please choose multiple answer";
            return false;
        } 
    }

    return true;

}

// Reset error message
function resetErrorMessage() {
    document.querySelector('#category_error_msg').style.display = "none";
    document.querySelector('#content_error_msg').style.display = "none";
    document.querySelector('#corectId_error_msg').style.display = "none";
}

// Click ok in Dialog 
document.querySelector('#dialog-ok')

    .addEventListener('click', () => {

        const id = args.questionById[0].id;
        let category = document.querySelector('#category-questions').value;
        let type = document.querySelector('#type-questions').value;
        let content = document.querySelector('#content-questions').value;
        
        let correctId = "";
        for (i = 0; i < args.arrAnswerByQId.length; i++) {
            if (document.getElementById(`${i}`).checked) {
                correctId += `${i+1},`;
            }
        }
        newCorrectId = correctId.substring(0, correctId.length-1);
        const courseId = args.questionById[0].courseId


        if (validate(category, content)) {
            dialog.exit({
                action: 'ok',
                id: id,
                category: category,
                type: type,
                content: content,
                newCorrectId: newCorrectId,
                courseId: courseId,
                args: args
            });
        }
       
    });
    

