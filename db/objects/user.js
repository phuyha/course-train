let $ = require('jquery');

const appModel = require('../connect-db.js');

class User {

    // constructor(id, username, password, email, fullname, position) {
    // 	this.Id = id;
    // 	this.Username = username;
    // 	this.Password = password;
    // 	this.Email = email;
    //     this.Fullname = fullname;
    //     this.Position = position;
    // }

    getAllUsers = async () => {
        return new Promise((resolve, reject) => {
            appModel.connection.query('SELECT * FROM users', function (error, results, fields) {
                if (error) return reject(error);
                console.log('The solution is: ', results);
                resolve(results);
            });
        });
    };

    addUsers = (newUser) => {
        appModel.connection.query(`INSERT INTO users (id, username, password, email, fullname, position) VALUES ('${null}', '${newUser.username}',' ${newUser.password}',' ${newUser.email} ',' ${newUser.fullname} ', 'DEV')`);
        console.log("Insert successful!");
    };

    getUser = async (newUser) => {
        return new Promise((resolve, reject) => {
            appModel.connection.query(`SELECT * FROM users WHERE id = '${newUser.id}'`, function (error, results, fields) {
                if (error) return reject(error);
                console.log('The solution is: ', results);
                resolve(results);
            });
        });
    };


}

const user = new User();

module.exports = user;
