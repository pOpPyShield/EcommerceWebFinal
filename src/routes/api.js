const GenderService = require('../services/genderservices')
const Category = require("../models/index")['Category']
function getAllGender(req, res) {
    (async() => {
        res.json(await GenderService.getAllGenders())
    })()
}
function getAllCate(req, res) {
    (async() => {
        res.json(await Category.findAll())
    })()
}
module.exports = {getAllGender, getAllCate}