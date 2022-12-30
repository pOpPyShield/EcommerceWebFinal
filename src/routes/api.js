const GenderService = require('../services/genderservices')
function getAllGender(req, res) {
    (async() => {
        res.json(await GenderService.getAllGenders())
    })()
}
module.exports = {getAllGender}