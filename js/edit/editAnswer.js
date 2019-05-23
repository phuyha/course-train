// const mysql = require('../db/db.js');

const args = dialog.argument;

document.querySelector("#id-answer").value = args[0].id
document.querySelector("#questionId-answer").placeholder  = args[0].questionId
document.querySelector("#content-answer").placeholder  = args[0].content

document.querySelector('#dialog-ok')
    
    .addEventListener('click', () => {

        const id = document.querySelector('#id-answer').value;
        const questionId = args[0].questionId;
        const content = document.querySelector('#content-answer').value;
      
        dialog.exit({
            action: 'ok',
            id: id,
            questionId: questionId,
            content: content,
            args: args,
        });
    });