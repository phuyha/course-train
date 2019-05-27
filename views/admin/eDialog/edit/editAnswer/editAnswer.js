// const mysql = require('../db/db.js');
const args = dialog.argument;



document.querySelector("#id-answer").value = args.answerByID[0].id
document.querySelector("#questionId-answer").placeholder  = args.questionById[0].content
document.querySelector("#content-answer").placeholder  = args.answerByID[0].content

function validate(content) {
    // Check valid content
    if (!content) {
        resetErrorMessage();
        document.querySelector('#content_error_msg').innerHTML = "Please enter content";
        document.querySelector('#content-answer').focus();
        document.querySelector('#content_error_msg').style.display = "block";
        return false;
    } else {
        document.querySelector('#content_error_msg').style.display = "none";
    }
    return true;
}

// Reset error message
function resetErrorMessage() {
    document.querySelector('#content_error_msg').style.display = "none";
}

document.querySelector('#dialog-ok')
    
    .addEventListener('click', () => {

        const id = document.querySelector('#id-answer').value;
        const questionId = args.questionById[0].id
        let content = document.querySelector('#content-answer').value;

        if (validate(content)) {
            dialog.exit({
                action: 'ok',
                id: id,
                questionId: questionId,
                content: content,
                args: args,
            });
        }
        
    });