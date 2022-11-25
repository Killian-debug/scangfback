const mysql = require("mysql");

const dbInfos = {
    host : process.env.DB_HOST,
    port : process.env.DB_PORT,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
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