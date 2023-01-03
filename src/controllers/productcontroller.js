const Product = require('../models/')['Product']
function iterativeDict(dict) {
    let lengthDict = Object.keys(dict).length
    for(let i = 0; i<lengthDict;i++){
        console.log(dict[""+i]["Size"])
        console.log(dict[""+i]["Quantity"])
    }
}
function addProduct(req, res) {
    console.log(req.files)
    var bodyData = JSON.parse(JSON.stringify(req.body))
    console.log(bodyData.dictSizeQuant)
    var sizeQuants = JSON.parse(bodyData.dictSizeQuant)
    //iterativeDict(sizeQuants)
    //1. Create product with name, description, price
    //2. Create productsizes with sizes, quantitys, ProductId
    //3. Create image with path, ProductId
}
module.exports={addProduct}