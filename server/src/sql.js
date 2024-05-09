var mysql = require('mysql2');
const dotenv = require('dotenv')


const resultdotenv = dotenv.config()


if (resultdotenv.error) {
    //throw resultdotenv.error
    console.log("sin archivo .env en el servidor")
}



const pool = mysql.createPool({
    host: process.env.DDBB_HOST,
    port: process.env.DDBB_PORT,
    user: process.env.DDBB_USER,
    password: process.env.DDBB_PASS,
    database: process.env.DDBB_DATABASE,
});
console.log("ddbb:"+process.env.DDBB_HOST+":"+process.env.DDBB_PORT)



function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // finaliza la sesión
                    connection.release()
                })
            }
        })
    })
}

exports.query = query;