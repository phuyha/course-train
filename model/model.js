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
            this.connection.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, function (error, results, fields) {
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


    // <--- END COURSE

    // ---> USERS_COURSES
    getUserPassedCourses = async (userId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM users_courses WHERE userId = '${userId}' AND status = 1`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };
    // <--- END USERS_COURSES

    // ---> QUESTIONS
    getQuestionsByCourseId = async (courseId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM questions WHERE courseId = '${courseId}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    getCorrectAnswersByQuestionId = async (questionId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM questions WHERE id = '${questionId}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };

    // <--- END QUESTIONS

    // ---> ANSWERS
    getAnswersByQuestionId = async (questionId) => {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM answers WHERE questionId = '${questionId}'`, function (error, results, fields) {
                if (error) return reject(error);
                resolve(results);
            });
        });
    };
    // <--- END ANSWERS

}

const model = new Model();
module.exports = model;

