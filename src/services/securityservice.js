const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// get config vars
dotenv.config();
class SecurityService {
    static async generateAccessToken(userName) {
        return await jwt.sign(userName, process.env.TOKEN_SECRET, {expiresIn: '86400s'})
    }
}
module.exports = SecurityService