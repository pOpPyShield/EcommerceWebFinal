const mysql = require('mysql')
const con = mysql.createConnection({
    host: "localhost",
    user: "huyroot",
    password: "Abcd1234",
    database: "EcommerceWebSite"
})
async () => {
    await con.connect((err) => {
        if (err) throw err
    })
    console.log("Connected!")
}
module.exports = con
