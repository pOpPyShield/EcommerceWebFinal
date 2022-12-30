const Category = require("../models/")["Category"]
const Gender = require("../models/")["Gender"]
function insertCategory(req, res, next) {
    (async() => {
        try {
            var gender = await Gender.findOne({where: {name: req.body.genName}})
            var categoryObj = await Category.create({name: req.body.name, createdAt: new Date(), updatedAt: new Date(), GenderId: gender.id})
            await categoryObj.save()
            res.json({result: categoryObj.name, operation: "Add"})
        } catch(err) {
            res.send(err)
        }
    })()
}
function updateCategory(req, res, next) {
    (async() => {
        try {
            var category = await Category.findOne({where: {name: req.body.name}})
            var gender =await Gender.findOne({where: {name: req.body.genName}})
            if(category == null) {
                throw Error(`Not has ${req.body.name} category`)
            } else if(gender == null) {
                throw Error(`Gender ${gender} invalid`)
            }
            await category.update({name: req.body.newName, GenderId: gender.id})
            await category.save()
            res.json({result: req.body.name, operation: "Update"})
        }catch(err) {
            res.send(err)
        }
    })()
}
function deleteCategory(req, res, next) {
    (async() => {
        try {
            var category = await Category.findOne({where: {name: req.body.name}})
            if(category == null) {
                throw Error(`Not has ${req.body.name} category`)
            }
            await category.destroy()
            res.json({result: req.body.name, operation: "Delete"})
        }catch(err) {
            res.send(err)
        }
    })()
}
module.exports = {insertCategory, updateCategory, deleteCategory}