const args = dialog.argument;

// When window load
window.onload = function () {
    for(i = 0; i < args.length; i++) {
        var option = document.createElement('option');
        option.text = args[i].name;
        option.value = args[i].id;
        document.getElementById("courseId-questions").add(option, 0);  
    }
};

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

    const listAnswer = document.querySelectorAll("input[class='text-answer']");
    // Count all answer
    let countAnswer = 0;
    for (i = 0; i < listAnswer.length; i++) {
        if (listAnswer[i].value) {
            countAnswer++;
        }
    }

    // Count number of checkbox correct question
    const listCheckBox = document.querySelectorAll("input[type='checkbox']");
    let countCorrectId = 0;
    for(i = 0; i < listCheckBox.length; i++) {
        if (listCheckBox[i].checked == true) {
            countCorrectId++;
        }
    }

    // Check number of answer at least 3 questions
    if (countAnswer < 3) {
        resetErrorMessage();
        document.querySelector('#content_error_msg').innerHTML = "You must enter at least 4 questions";
        document.querySelector('#content_error_msg').style.display = "block";
        return false;
    } else {
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
    }

    return true;

}

// Reset error message
function resetErrorMessage() {
    document.querySelector('#category_error_msg').style.display = "block";
    document.querySelector('#content_error_msg').style.display = "block";
    document.querySelector('#corectId_error_msg').style.display = "block";
}

document.querySelector('#dialog-ok')

    .addEventListener('click', () => {

        const category = document.querySelector('#category-questions').value;
        const type = document.querySelector('#type-questions').value;
        const content = document.querySelector('#content-questions').value;
        const courseId = document.querySelector('#courseId-questions').value;
        
        // const length =  [...document.querySelectorAll(".selected-answer")].length
        // const data = [...document.querySelectorAll(".selected-answer")][1].value;
        
        // Get array correct Answer
        let correctId = "";
        let correctIdIndex = 0;
        for (i = 0; i < [...document.querySelectorAll(".selected-answer")].length; i++) {
            const checked = [...document.querySelectorAll(".selected-answer")][i].checked;
            const answer = document.querySelector(`#answer-${i+1}`).value;

            // Check if input text have data then get it is first correct answer
            if (answer) {
                correctIdIndex++;
            }

            // Check checkbox is checked and answer have data then add correctId
            if (checked && answer) {
                correctId += `${correctIdIndex},`;
            }
        }

        // Get array Answer
        let arrAnswer = [];
        let listAnswer = document.querySelectorAll("input[class='text-answer']");
        for (i = 0; i < listAnswer.length; i++) {
            // Check have data
            if (listAnswer[i].value) {
                arrAnswer.push(listAnswer[i].value)
            }
        }

        newCorrectId = correctId.substring(0, correctId.length-1);

        if (validate(category, content)) {
            dialog.exit({
                action: 'ok',
                category: category,
                type: type,
                content: content,
                newCorrectId: newCorrectId,
                courseId: courseId,
                arrAnswer: arrAnswer,
                args: args
            });
        }
        
    });