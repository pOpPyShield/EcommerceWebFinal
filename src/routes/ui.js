const Admin = require('../models/index')['Admin']
const SecurityService = require('../services/securityservice')
const CategoryService = require('../services/categoryservices')
const GenderService = require('../services/genderservices')
const ProductService = require('../services/productservices')
function processLogin(req, res){
        (async() => {
            var admin = new Admin(req.body.UserName, req.body.Password)
            if(await admin.checkAdmin()) {
                const token = await SecurityService.generateAccessToken({userName: req.body.UserName})
                res.status(200).json({UserName: admin.userName,redirect_path: "/Dashboard", token})
                next()
            } else {
                res.status(401).json({redirect_path: "/"})
            }
        })()
}
function login(req, res){
    if (req.resultAuth) {
        res.redirect('/dashboard')
    } else {
        res.render('Login/', {title: "Admin login"})
    }
}
function dashboard(req, res) {
    res.render('Dashboard/', {title: "Dashboard", UserName: req.resultAuth.userName})
}
function gender(req, res) {
    (async() => {
        var genders = await GenderService.getAllGenders()
        console.log(JSON.stringify(genders, null, 2))
        res.render('Dashboard/partials/genderContainer/', {gender: genders})
    })()
}
function category(req, res) {
    (async() => {
        var categories = await CategoryService.getAllCategories()
        var genders = await GenderService.getAllGenders()
        res.render('Dashboard/partials/categoryContainer/', {category: categories, gender: genders})
    })()
}
function sumProductSizeQuantity(products){
    let sum = 0
    for(let i = 0; i<=products.length-1;i++){
        for(let j = 0; j<=products[i].ProductSizes.length-1;j++){
            //console.log(JSON.stringify(products[i].ProductSizes[j]["quantity"], null, 2))
            sum+=products[i].ProductSizes[j]["quantity"]
        }
        products[i]["SizeQuant"]={ sum }
        sum=0
    }

}
function product(req, res) {
    (async() => {
        var products = await ProductService.getAllProducts2()
        var categories = await CategoryService.getAllCategories()
        sumProductSizeQuantity(products)
        console.log(JSON.stringify(products[0].Images[0].path, null, 2))
        //console.log(products[0].SizeQuant)
        res.render('Dashboard/partials/productContainer/', {products: products, categories: categories})
    })()
}
function page404(req,res) {
    res.status(404).render('Error/404')
}
module.exports = {login, processLogin, dashboard, page404, category, gender, product}