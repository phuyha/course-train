// const mysql = require('../db/db.js');
// const $ = require('jquery');

const args = dialog.argument;

document.querySelector("#id-questions").value = args.questionById[0].id;
document.querySelector("#category-questions").placeholder  = args.questionById[0].category;
document.querySelector("#content-questions").placeholder  = args.questionById[0].content;
document.querySelector("#courseId-questions").placeholder  = args.questionById[0].courseId;

$("#test").innerHtml = "Fasfsdfa"
$("#test").text = "Fasfsdfa"
$("#test").textContent = "Fasfsdfa"
$("#test").val = "Fasfsdfa"




for(i = 0; i < args.arrAnswerByQId.length; i++) {
    // let content = `<input type="checkbox" name="vehicle1" value="${args.arrAnswerByQId[i].content}"></input>`;
    // $(".input").append(content)
    // var para = document.createElement("input");
    // para.type = "checkbox";
    // para.name = "answer";
    // para.value = args.arrAnswerByQId[i].content;
    // document.getElementById("input").appendChild(para);
}

document.querySelector('#dialog-ok')
    
    .addEventListener('click', () => {

        const id = document.querySelector('#id-answer').value;
        const questionId = args.questionById[0].id;
        const content = document.querySelector('#content-answer').value;
      
        dialog.exit({
            action: 'ok',
            id: id,
            questionId: questionId,
            content: content,
            args: args,
        });
    });