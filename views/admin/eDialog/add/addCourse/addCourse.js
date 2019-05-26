const args = dialog.argument;

// Validate input field
function validate(name, descript, total_time) {
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
        let name = document.querySelector('#name-course').value;
        let descript = document.querySelector('#descript-course').value;
        let valid = document.querySelector('#valid-course').value;
        let total_time = document.querySelector('#total-course').value;
        
        if (validate(name, descript, total_time)) {
            dialog.exit({
                action: 'ok',
                name: name,
                descript: descript,
                valid: valid,
                total_time: total_time,
                args: args,
            });
        }
        
    });
