const con = require("../../Database/db")
function checkAdmin(userName, password) {
    let queryStatement = "SELECT COUNT(*) FROM `Admin` WHERE UserName='" + userName +"' and Password='" + password +"'"
    return new Promise((resolve, reject) => {
        con.query(queryStatement, (err, result) => {
            return err ? reject(err) : resolve(result[0]['COUNT(*)'])
        })
    })
}
function authLogin(req, res, next) {
    (async () => {
        const result = await checkAdmin(req.body.UserName, req.body.Password)
        if (!(result === 1)) {
            res.send({redirect_path: "/"})
        } else {
            next()
        }
    })()
}
module.exports ={authLogin, con}