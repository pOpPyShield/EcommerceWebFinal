const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { Encryptor } = require('strong-cryptor')
// get config vars
dotenv.config();
class SecurityService {
    static async generateAccessToken(userName) {
        return await jwt.sign(userName, process.env.TOKEN_SECRET, {expiresIn: '86400s'})
    }
    static async encryptName(name) {
        const encryptor = new Encryptor(process.env.ENCRYPT_SECRET)
        return encryptor.encrypt(name)
    }
}
module.exports = SecurityService