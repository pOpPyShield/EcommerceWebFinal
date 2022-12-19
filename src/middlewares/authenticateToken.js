const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    (async() => {
        try {
            var result = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET)
            if (result){
                req.resultAuth = result
                next()
            }
        }catch(err){
            console.log(err)
            return res.redirect("/")
        }
    })()
}
module.exports = authenticateToken