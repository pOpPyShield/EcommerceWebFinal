const Gender = require("../models")['Gender']
const ImageGender = require("../models")['ImageGender']
class GenderService {
    static async getAllGenders() {
        return await Gender.findAll({
            include: ImageGender
        })
    }
}
module.exports = GenderService