const { json } = require("body-parser")
const con = require("../../database/db")
function queryCategory() {
    let queryStatement = "SELECT * FROM `Category`"
    con.query(queryStatement, (err, data) => {
        return err ? json({message: "Error executing"}) : json(data)
    })
}
module.exports = {queryCategory, con}