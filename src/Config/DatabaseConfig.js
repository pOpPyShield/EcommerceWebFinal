const {Sequelize} = require('sequelize')
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_WORKING, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})
const con = async () => {try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
}
const insertInstance = async(obj) => {
    await obj.save()
    console.log(obj.toJSON())
}
/*
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
*/
module.exports = {con,sequelize, insertInstance}