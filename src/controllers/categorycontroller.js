const Category = require("../models/")["Category"]
const CategoryService = require("../services/categoryservices")
function insertCategory(req, res, next) {
    (async() => {
        try {
            res.json(req.body.name)
            next()
        } catch(err) {
            console.log(err)
        }
    })()
}
module.exports = {insertCategory}