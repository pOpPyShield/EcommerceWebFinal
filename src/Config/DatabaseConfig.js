const mysql = require('mysql2')
require("dotenv").config();
const con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_WORKING,
    port: process.env.DB_PORT
})
con.getConnection((err) => {
    if(err) throw err
    console.log("Db connected")
})
module.exports = con
