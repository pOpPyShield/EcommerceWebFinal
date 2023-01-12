const GenderService = require('../services/genderservices')
const Category = require("../models/index")['Category']
const Product = require("../models/index")['Product']
const ProductService = require("../services/productservices")
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
        res.json(await ProductService.getAllProducts2())
    })()
}
module.exports = {getAllGender, getAllCate, getAllProduct}