const mysql = require("mysql");

const dbInfos = {
    user : process.env.DB_USERNAME,
    Password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    host : process.env.DB_HOST
};

const db = mysql.createConnection(dbInfos);

db.connect((err) => {
    if(!err) {
        console.log("Connexion effectuée.");
    }else {
        throw err;
    }
});

module.exports = db;