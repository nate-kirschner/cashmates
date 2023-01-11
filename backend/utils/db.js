const mysql = require('mysql');

const database = "cashmates";

const makeConnection = () => {
    let con = mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database,
        port: process.env.RDS_PORT,
    });
    
    con.connect(function(err) {
        if (err) throw err;
    });

    return con;
}

exports.makeQuery = (query, params) => {
    const db = makeConnection()

    const response = new Promise((resolve, reject) => {
        db.query(query, params, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });

    db.end();
    return response;
}