var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'coursetrain',
    charset: 'utf8_general_ci'
});

// Return a promise to get results / Normal connection.query cant'
const getAllCourses = async function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `courses`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const getCourseByID = async function (id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `courses` WHERE id = ?', [id], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const getAllAnswers = async function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `answers`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const getAnswerByID = async function (id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `answers` WHERE id = ?', [id], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const getAllAnswerByQuestionId = async function (id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT `content` FROM `answers` WHERE questionId = ?', [id], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const getAllQuestions = async function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `questions`', function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const getQuestionById = async function (id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `questions` WHERE id = ?', [id], function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const deleteByID = async function (table, id) {
    return new Promise((resolve, reject) => {
        let sql = `DELETE FROM ${table} WHERE ${id} = id`
        connection.query(sql, function (error, results, fields) {
            if (error) return reject(error);

            resolve(results.affectedRows);
        });
    });
}

const updateByID = async function (table, object) {
    return new Promise((resolve, reject) => {
        let sql;
        console.log(object)
        if (table === '#courses') {
            sql = `UPDATE ${table} SET name = "${object.name}", descript = "${object.descript}", valid = ${object.valid}, total_time =${object.total_time}  WHERE id = ${object.id}`;
        } else {
            sql = `UPDATE ${table} SET content = "${object.content}" WHERE id = ${object.id}`;
        }
        console.log(sql)
        connection.query(sql, function (error, results, fields) {
            if (error) return reject(error);

            resolve(results.affectedRows);
        });
    });
}

module.exports = {
    getAllCourses,
    getAllAnswers,
    getAllQuestions,
    deleteByID,
    getCourseByID,
    updateByID,
    getAnswerByID,
    getQuestionById,
    getAllAnswerByQuestionId
};
