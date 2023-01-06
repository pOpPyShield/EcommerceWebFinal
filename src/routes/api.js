const GenderService = require('../services/genderservices')
const Category = require("../models/index")['Category']
const Product = require("../models/index")['Product']
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
function getAllProduct(req, res){
    (async() => {
        res.json(await Product.findAll())
    })()
}
module.exports = {getAllGender, getAllCate, getAllProduct}