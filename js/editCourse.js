// let $ = require('jquery');
const args = dialog.argument;

// $("#id-course").attr("placeholder", `"${args.id}"`).val("").focus().blur();



document.querySelector("#id-course").value = args[0].id
document.querySelector("#name-course").placeholder  = args[0].name
document.querySelector("#descript-course").placeholder  = args[0].descript
document.querySelector("#valid-course").placeholder  = args[0].valid
document.querySelector("#total-course").placeholder  = args[0].total_time



// $("#id-course").attr("placeholder", args[0].id).val("").focus().blur();
// $(".input-edit").attr("placeholder", courseByID[0].name).val("").focus().blur();
// $(".input-edit").attr("placeholder", courseByID[0].descript).val("").focus().blur();
// $(".input-edit").attr("placeholder", courseByID[0].valid).val("").focus().blur();
// $(".input-edit").attr("placeholder", courseByID[0].total_time).val("").focus().blur();

document.querySelector('#dialog-ok')

    .addEventListener('click', () => {
        const id = document.querySelector('#id-course').value;
        const name = document.querySelector('#name-course').value;
        const descript = document.querySelector('#descript-course').value;
        const valid = document.querySelector('#valid-course').value;
        const total_time = document.querySelector('#total-course').value;

        dialog.exit({
            action: 'ok',
            id: id,
            name: name,
            descript: descript,
            valid: valid,
            total_time: total_time,
            args: args,
        });
    });
