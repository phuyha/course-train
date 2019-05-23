let $ = require('jquery');

const appModel = require('../connect-db.js');

class Course {
    
    getAllCourses = async () => {
        return new Promise((resolve, reject) => {
            appModel.connection.query('SELECT * FROM courses', function (error, results, fields) {
                if (error) return reject(error);
                console.log('The solution is: ', results);
                resolve(results);
            });
        });
    };

}

const course = new Course();

module.exports = course;
