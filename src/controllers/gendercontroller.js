const Gender = require("../models/")["Gender"]
function insertGender(req, res, next) {
    (async() => {
        try {
            var gender = await Gender.create({name: req.body.name})
            await gender.save()
            res.json({result: gender.name, operation: "Add"})
        } catch(err) {
            res.send(err)
        }
    })()
}
module.exports={insertGender}