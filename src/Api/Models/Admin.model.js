var db = require("../../Config/DatabaseConfig")
var admin = {
    getAdminByUsernameAndPassword:function(userName, password, callback) {
        const queryStatement = "SELECT COUNT(*) FROM `Admin` WHERE UserName='" + userName +"' and Password='" + password +"'"
        return db.query(queryStatement)
    }
}