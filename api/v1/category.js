const con = require("../../database/db")
function queryCategory() {
    let queryStatement = "SELECT * FROM `Category`"
    return new Promise((resolve, reject) => {
        con.query(queryStatement, (err, result) => {
            return err ? reject(err) : resolve(result)
        })
    })
}