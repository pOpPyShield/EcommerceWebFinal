const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    (async() => {
        try {
            if(req.cookies.token != null) {
                var result = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET)
                req.resultAuth = result
                next()
            } else {
                req.resultAuth=null
                next()
            }
        }catch(err){
            console.log(err)
            return res.redirect("/")
        }
    })()
}
module.exports = authenticateToken