// const mysql = require('../db/db.js');

let args = dialog.argument;


document.querySelector("#id-answer").value = args.answerByID[0].id
document.querySelector("#questionId-answer").placeholder  = args.questionById[0].content
document.querySelector("#content-answer").placeholder  = args.answerByID[0].content

document.querySelector('#dialog-ok')
    
    .addEventListener('click', () => {

        const id = document.querySelector('#id-answer').value;
        const questionId = args.questionById[0].id
        const content = document.querySelector('#content-answer').value;
      
        dialog.exit({
            action: 'ok',
            id: id,
            questionId: questionId,
            content: content,
            args: args,
        });
    });