const Admin = require('../models/index')['Admin']
const SecurityService = require('../services/securityservice');
function checkCredentials(req, res, next) {
        (async() => {
            var admin = new Admin(req.body.UserName, req.body.Password)
            if(await admin.checkAdmin()) {
                res.status(200).json({redirect_path: "/dashboard", token: await SecurityService.generateAccessToken({userName: req.body.UserName})})
                next()
            } else {
                res.status(403).json({redirect_path: "/"})
            }
        })()
}
module.exports={checkCredentials}