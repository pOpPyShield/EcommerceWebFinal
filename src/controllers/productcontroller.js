const Product = require('../models/')['Product']
const ProductImage = require('../models/')['Image']
const ProductSize = require('../models/')['ProductSize']
const pathSave = require('path').resolve(__dirname, '..')+"/Static/imgs/ProductImg/"
function iterativeDict(dict, prodId) {
    (async() => {
        try {
            let lengthDict = Object.keys(dict).length
            let arrBulk = []
            for(let i = 0; i<lengthDict;i++){
                arrBulk.push({ProductId: prodId, size: dict[""+i]["Size"], quantity: parseInt(dict[""+i]["Quantity"])})
            }
            ProductSize.bulkCreate(arrBulk)
        } catch(err) {
            return err
        }
    })()
}
function removeCommas(currency) {
    return parseInt(currency.replace(/,/g,''))
}
function saveImageToServer(file) {
    file.mv(pathSave+file.name, (err) => {
        if (err) return err
        console.log("file uploaded")
    })
}
function addProduct(req, res) {
    (async() =>{
        console.log(req.files)
        var bodyData = JSON.parse(JSON.stringify(req.body))
        console.log(bodyData.dictSizeQuant)
        var sizeQuants = JSON.parse(bodyData.dictSizeQuant)
        //1. Create product with name, CategoryId,description, price
        console.log(parseInt(bodyData.price.replace(/,/g,'')))
        try {
            var product = await Product.create({name: bodyData.name, CategoryId: parseInt(bodyData.category), description: bodyData.description, price: removeCommas(bodyData.price)})
            await product.save()
            //2. Create image with path, ProductId
            var image = await ProductImage.create({path: req.files.myFile.name, ProductId: product.id})
            await image.save()
            //3. Save image to server
            saveImageToServer(req.files.myFile)
            //4. Create productsizes with sizes, quantitys, ProductId
            iterativeDict(sizeQuants, product.id)
            //5. Send response to user
            res.json({result: product.name, operation: "Add"})
        } catch (err) {
            res.send(err)
        }
    })()
}
function iterativeDictUpdate(dict, prodId) {
    (async() => {
        try {
            //1. Check each dict that have in ProductSize
            let prodSizeQuery = await ProductSize.findAll({
                where: {ProductId: prodId}
            })
            //2. Get the length
            let lengthOfDictOrigin = prodSizeQuery.length
            var startLength = 0
            //3. Working with dict
            let lengthDict = Object.keys(dict).length
            for(let i = 0; i<lengthDict; i++) {
                console.log(dict[i])
                //2. Update that dict
                if(startLength < lengthOfDictOrigin) {
                    await prodSizeQuery[i].update({ProductId: prodId, size: dict[i].Size, quantity: parseInt(dict[i].Quantity)})
                    await prodSizeQuery[i].save()
                } else {
                //3. If the dict not have in the ProductSize then insert it
                    let productSize = await ProductSize.create({ProductId: prodId, size: dict[i].Size, quantity: parseInt(dict[i].Quantity)})
                    await productSize.save()
                }
                startLength++
            }
        } catch(err) {
            return err
        }
    })()
}
function updateProduct(req, res) {
    (async() => {
        try {
            var bodyData = JSON.parse(JSON.stringify(req.body))
            var sizeQuants = JSON.parse(bodyData.dictSizeQuant)
            console.log(bodyData)
            console.log(req)
            if(req.files == null) {
                console.log("Execute file == null")
                var product = await Product.findByPk(bodyData.id)
                if (product == null) {
                    throw Error("Don't has any product match the name to update")
                }
                await product.update({name: bodyData.name, price: removeCommas(bodyData.price), description: bodyData.description, CategoryId: parseInt(bodyData.category)})
                await product.save()
                iterativeDictUpdate(sizeQuants, product.id)
            } else {

            }
        } catch(err) {
            res.send(err)
        }
    })()
}
module.exports={addProduct, updateProduct}