const mysql = require('mysql');

class Model {
    constructor() {
        this.connection = null;
    }

    initialize = async () => {
        let con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: null,
            database: 'coursetrain',
            charset: 'utf8'
        });
        this.connection = con;
    };

    // ---> USER
    getUsers = async () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM users', function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    getUserById = async (id) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM users WHERE id = '${id}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    getUserLogin = async (username, password) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM users WHERE username = '${username}' AND '${password}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };
    // <--- END USER

    // ---> COURSE
    getCourses = async () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM courses', function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    // ========================== M ===========================
    // Return a promise to get results / Normal connection.query cant'
getAllCourses = async function () {
    console.log("Da vao get all course")
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `courses`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

getCourseByID = async function (id) {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `courses` WHERE id = ?', [id], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

getTop1CourseDESC = async function () {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `courses` ORDER BY id DESC LIMIT 1', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

getAllAnswers = async function () {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `answers`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

getAnswerByID = async function (id) {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `answers` WHERE id = ?', [id], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

getAllAnswerByQuestionId = async function (id) {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT `content` FROM `answers` WHERE questionId = ?', [id], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

getAllQuestions = async function () {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `questions`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

getTop1Question = async function () {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `questions` ORDER BY id DESC LIMIT 1', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}


getQuestionById = async function (id) {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `questions` WHERE id = ?', [id], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

getTop1AnswerDESC = async function () {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT * FROM `answers` ORDER BY id DESC LIMIT 1', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

deleteByID = async function (table, id) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${table} WHERE ${id} = id`
        this.connection.query(sql, function (error, results, fields) {
            if (error) return reject(error);

            resolve(results.affectedRows);
        });
    });
}

updateByID = async function (table, object) {
    return new Promise((resolve, reject) => {
        let sql;

        if (table === 'courses') {
            sql = `UPDATE ${table} SET name = "${object.name}", descript = "${object.descript}", valid = ${object.valid}, total_time =${object.total_time}  WHERE id = ${object.id}`;
        } else if (table === 'questions') {
            sql = `UPDATE ${table} SET category = "${object.category}", type = ${object.type}, content = "${object.content}", correctId = "${object.newCorrectId}"  WHERE id = ${object.id}`;
        } else {
            sql = `UPDATE ${table} SET content = "${object.content}" WHERE id = ${object.id}`;
        }

        this.connection.query(sql, function (error, results, fields) {
            if (error) return reject(error);

            resolve(results.affectedRows);
        });
    });
}

addCourse = async function (object) {
    console.log(object)
    return new Promise((resolve, reject) => {
        this.connection.query('INSERT INTO `courses` (`name`, `descript`, `valid`, `total_time`) VALUES(?, ?, ?, ?)', [object.name, object.descript, object.valid, object.total_time], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

addQuestion = async function (object) {
    console.log(object)
    return new Promise((resolve, reject) => {
        this.connection.query('INSERT INTO `questions` (`category`, `type`, `content`, `correctId`, `courseId`) VALUES(?, ?, ?, ?, ?)', [object.category, object.type, object.content, object.newCorrectId, object.courseId], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

addAnswerByQuestionId = async function (answer, questionId) {
    console.log(answer)
    console.log(questionId)
    return new Promise((resolve, reject) => {
        this.connection.query('INSERT INTO `answers` (`content`, `questionId`) VALUES(?, ?)', [answer, questionId], function (error, results, fields) {
            if (error) return reject(error);
            
            resolve(results);
        });
    });
}
    // ========================== M ===========================






    
    // <--- END COURSE
}

const model = new Model();
module.exports = model;

