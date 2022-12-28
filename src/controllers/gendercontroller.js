const Gender = require("../models/")["Gender"]
const ImageGender = require("../models/")["ImageGender"]
const SecurityService = require("../services/securityservice")
const pathSave = require('path').resolve(__dirname, '..')+"/Static/imgs/GenderImg/"
function getNameImage(url) {
    return url.split('.').slice(0, -1).join('.')
}
function getFileExtension(url) {
    return url.split('.').pop()
}
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
            var fileName = getNameImage(req.files.myFile.name)
            var fileType = getFileExtension(req.files.myFile.name)
            var imageGender = await ImageGender.create({path: fileName, ext: fileType, GenderId: gender.id})
            await imageGender.save()
            var fileObj = req.files.myFile
            fileObj.mv(pathSave+fileName+"."+fileType, (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("file uploaded")   
                }
            })
            res.json({result: gender.name, operation: "Add"})
        } catch(err) {
            res.send(err)
        }
    })()
}
module.exports={insertGender}