const mysql = require('mysql');

class AppModel {
  
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'coursetrain',
    charset: 'utf8'
  });

}
let appModel = new AppModel();

module.exports = appModel;



