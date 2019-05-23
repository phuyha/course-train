class Validator {

    // Function checking valid student name
    static validateUserName(username) {

        console.log("Hello");
        console.log("Username " + username);
        const regexName = /^[A-Za-z0-9]+{3,16}$/;
        
        if (!username) {
            const error = new Error("Please enter username");
            error.type = "Empty";
            throw error;
        }

        if (!regexName.test(username)) {
            return;
        }
    }

    // Function checking valid student grade (re-use)
    static isValidGrade(grade) {

        const regexGrade = /^\d+$/;

        if (!grade) {
            return false;
        }

        if (!regexGrade.test(grade)) {
            return false;
        }

        if (grade < 0 || grade > 10) {
            return false;
        }

        return true;
    }

    // Function checking valid student math grade
    static validateMathGrade(grade) {

        if (!grade) {
            const error = new Error("Please enter Math grade");
            error.type = "Empty";
            throw error;
        }

        if (!this.isValidGrade(grade)) {
            const error = new Error("Please enter a valid Math grade");
            error.type = "Invalid";
            throw error;
        }

    }
}

module.exports = Validator;