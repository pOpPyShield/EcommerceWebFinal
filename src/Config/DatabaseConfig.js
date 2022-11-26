const mysql = require('mysql2')
require("dotenv").config();
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_WORKING,
    port: process.env.DB_PORT
})
async () => {
    await con.connect((err) => {
        if (err) throw err
    })
    console.log("Connected!")
}
module.exports = con
