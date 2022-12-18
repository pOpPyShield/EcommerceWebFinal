const Gender = require("../models")['Gender']
class GenderService {
    static async getAllGenders() {
        return await Gender.findAll()
    }
}
module.exports = GenderService