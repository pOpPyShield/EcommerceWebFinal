const Gender = require("../models/")["Gender"]
const SecurityService = require("../services/securityservice")
function insertGender(req, res, next) {
    (async() => {
        try {
            var bodyData = JSON.parse(JSON.stringify(req.body))
            console.log(bodyData.name)
            var gender = await Gender.create({name: bodyData.name})
            await gender.save()
            if(!req.files || Object.keys(req.files).length ==0) {
                throw new Error("File not upload successful")
            }
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
module.exports={insertGender}