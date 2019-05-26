// let $ = require('jquery');
const args = dialog.argument;

document.querySelector("#id-course").value = args[0].id
document.querySelector("#name-course").placeholder  = args[0].name
document.querySelector("#descript-course").placeholder  = args[0].descript

args[0].valid == 0 ? document.querySelector(".unavailable").checked  = true : document.querySelector(".available").checked  = true;
    
document.querySelector("#total-course").placeholder  = args[0].total_time



// Validate input field
function validate(name, descript, valid, total_time) {
        // Check valid name
        if (!name) {
            resetErrorMessage();
            document.querySelector('#name_error_msg').innerHTML = "Please enter name";
            document.querySelector('#name-course').focus();
            document.querySelector('#name_error_msg').style.display = "block";
            return false;
        } else {
            document.querySelector('#name_error_msg').style.display = "none";
        }

        // Check valid descript
        if (!descript) {
            resetErrorMessage();
            document.querySelector('#descript_error_msg').innerHTML = "Please enter descript";
            document.querySelector('#descript-course').focus();
            document.querySelector('#descript_error_msg').style.display = "block";
            return false;
        } else {
            document.querySelector('#descript_error_msg').style.display = "none";
        }

        // // Check valid Valid field
        // if (!valid) {
        //     resetErrorMessage();
        //     document.querySelector('#valid_error_msg').innerHTML = "Please enter valid";
        //     document.querySelector('#valid-course').focus();
        //     document.querySelector('#valid_error_msg').style.display = "block";
        //     return false;
        // }  else if (isNaN(valid) ) {
        //     resetErrorMessage();
        //     document.querySelector('#valid_error_msg').innerHTML = "Valid must be a number";
        //     document.querySelector('#valid-course').focus();
        //     document.querySelector('#valid_error_msg').style.display = "block";
        //     return false;
        // } else if (Number.parseInt(valid) != 0 && Number.parseInt(valid) != 1) {
        //     resetErrorMessage();
        //     document.querySelector('#valid_error_msg').innerHTML = "Valid must be 0 or 1";
        //     document.querySelector('#valid-course').focus();
        //     document.querySelector('#valid_error_msg').style.display = "block";
        //     return false;
        // } else {
        //     document.querySelector('#valid_error_msg').style.display = "none";
        // }

        // Check valid Total time
        if (!total_time) {
            resetErrorMessage();
            document.querySelector('#total_time_error_msg').innerHTML = "Please enter total time";
            document.querySelector('#total-course').focus();
            document.querySelector('#total_time_error_msg').style.display = "block";
            return false;
        } else if (isNaN(total_time) ) {
            resetErrorMessage();
            document.querySelector('#valid_error_msg').innerHTML = "Total time must a number";
            document.querySelector('#total-course').focus();
            document.querySelector('#valid_error_msg').style.display = "block";
            return false;
        } else {
            document.querySelector('#total_time_error_msg').style.display = "none";
        }
        return true;
}

// Reset error message
function resetErrorMessage() {
    document.querySelector('#name_error_msg').style.display = "none";
    document.querySelector('#descript_error_msg').style.display = "none";
    document.querySelector('#total_time_error_msg').style.display = "none";
}

document.querySelector('#dialog-ok')

    .addEventListener('click', () => {
        const id = document.querySelector('#id-course').value;
        let name = document.querySelector('#name-course').value;
        let descript = document.querySelector('#descript-course').value;
        let valid = document.querySelector('.unavailable').checked == true ? 0 : 1;
        let total_time = document.querySelector('#total-course').value;
        
        // Check all input field is valid then exit dialog
        if (validate(name, descript, valid, total_time)) {
            dialog.exit({
                action: 'ok',
                id: id,
                name: name,
                descript: descript,
                valid: valid,
                total_time: total_time,
                args: args,
            });
        }

    });
