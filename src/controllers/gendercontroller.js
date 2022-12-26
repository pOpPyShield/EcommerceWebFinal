const Gender = require("../models/")["Gender"]
const SecurityService = require("../services/securityservice")
function insertGender(req, res, next) {
    (async() => {
        try {
            console.log(req.body)
            var gender = await Gender.create({name: req.body.name})
            await gender.save()
            res.json({result: gender.name, operation: "Add"})
        } catch(err) {
            res.send(err)
        }
    })()
}
function uploadFile(req, res, next) {
    (async() => {
        try {
            console.log(req)
            if(!req.files || Object.keys(req.files).length == 0) {
                throw new Error("File not upload successfull")
            } 
            console.log(req.files.myFile)
            res.json({result: true})
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    })()
}
module.exports={insertGender, uploadFile}