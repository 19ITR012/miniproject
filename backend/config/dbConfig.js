const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123",
    database: "skill"
});

module.exports = db;