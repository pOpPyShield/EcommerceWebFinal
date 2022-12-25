const Category = require("../models/")["Category"]
const CategoryService = require("../services/categoryservices")
function insertCategory(req, res, next) {
    (async() => {
        try {
            var categoryObj = await Category.create({name: req.body.name})
            await categoryObj.save()
            res.json({result: categoryObj.name, operation: "Add"})
        } catch(err) {
            res.send(err)
        }
    })()
}
module.exports = {insertCategory}