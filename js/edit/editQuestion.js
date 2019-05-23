// const mysql = require('../db/db.js');

// const args = dialog.argument;

document.querySelector("#id-questions").value = args.questionById;
// document.querySelector("#category-questions").placeholder  = args[0].category
// document.querySelector("#content-questions").placeholder  = args[0].content
// document.querySelector("#courseId-questions").placeholder  = args[0].courseId

// alert(args[0])
// alert(args[1])

// for(i = 0; i < args[1].length; i++) {
//     let content = `<input type="checkbox" name="vehicle1" value="${args[1].content}"></input>`;
//     document.querySelector(".input").append(content)
// }

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