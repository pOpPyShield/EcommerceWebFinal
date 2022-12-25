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
module.exports = {insertCategory}