const Admin = require('../models/index')['Admin']
const SecurityService = require('../services/securityservice')
const CategoryService = require('../services/categoryservices')
const GenderService = require('../services/genderservices')
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
function category(req, res) {
    (async() => {
        var categories = await CategoryService.getAllCategories()
        var genders = await GenderService.getAllGenders()
        res.render('Dashboard/partials/categoryContainer/', {category: categories, gender: genders})
    })()
}
function page404(req,res) {
    res.status(404).render('Error/404')
}
module.exports = {login, processLogin, dashboard, page404, category}