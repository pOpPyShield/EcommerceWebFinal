const Gender = require("../models/")["Gender"]
const ImageGender = require("../models/")["ImageGender"]
const SecurityService = require("../services/securityservice")
const pathSave = require('path').resolve(__dirname, '..')+"/Static/imgs/GenderImg/"
const fs = require("fs")
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
            console.log(fileObj)
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
function deleteGender(req, res, next) {
    (async() => {
        try {
            var bodyData = JSON.parse(JSON.stringify(req.body))
            var gender = await Gender.findOne({where: { name: bodyData.name}})
            var imageGender = await ImageGender.findOne({where: {GenderId: gender.id}})
            if(gender == null) {
                throw Error(`${bodyData.name} gender not found!`)
            }
            if(imageGender != null) {
                fs.unlink(pathSave+imageGender.path+"."+imageGender.ext, (err) => {
                    if(err) console.log(err)
                    console.log("Remove "+pathSave+imageGender.path+"."+imageGender.ext)
                })
            }
            await gender.destroy()
            res.json({result: gender.name, operation: "Delete"})
        } catch(err) {
            res.send(err)
        }
    })() 
}
function updateGender(req, res, next) {
    (async() => {
        try {
            var bodyData = JSON.parse(JSON.stringify(req.body))
            console.log(bodyData)
            console.log(req)
            //if(!(req.files || Object.keys(req.files).length >0)) {
            if(req.files == null) {
                console.log("Execute file == null")
                var gender= await Gender.findOne({where: {name: bodyData.name}})
                if(gender == null) {
                    throw Error(`${bodyData.name} gender not found`)
                }
                await gender.update({name: bodyData.newName})
                await gender.save()
                res.json({result: bodyData.name, operation: "Update"})
            } else {
                console.log("Execute file != null")
                var gender2= await Gender.findOne({where: {name: bodyData.name}})
                var imageGender = await ImageGender.findOne({where: {GenderId: gender2.id}})
                if(imageGender) {
                    await gender2.update({name: bodyData.newName})
                    await gender2.save()
                    fs.unlink(pathSave+imageGender.path+"."+imageGender.ext, (err) => {
                        if(err) console.log(err)
                        console.log("Remove "+pathSave+imageGender.path+"."+imageGender.ext)
                    })
                    await imageGender.update({path: getNameImage(req.files.myFile.name), ext: getFileExtension(req.files.myFile.name)})
                    await imageGender.save()
                    req.files.myFile.mv(pathSave+req.files.myFile.name, (err) => {
                        if(err) console.log(err)
                        console.log("file uploaded")   
                    })
                } else {
                    imageGender = await ImageGender.create({path: getNameImage(req.files.myFile.name), ext: getFileExtension(req.files.myFile.name), GenderId: gender2.id})
                    await imageGender.save()
                    var fileObj = req.files.myFile
                    console.log(fileObj)
                    fileObj.mv(pathSave+getNameImage(req.files.myFile.name)+"."+getFileExtension(req.files.myFile.name), (err) => {
                        if(err) {
                            console.log(err)
                        } else {
                            console.log("file uploaded")   
                        }
                    })
                }
                res.json({result: bodyData.name, operation: "Update"})
            }
        }catch(err) {
            res.send(err)
        }
    })()
}
module.exports={insertGender, deleteGender, updateGender}