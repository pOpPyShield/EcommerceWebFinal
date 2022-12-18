const Gender = require("../models")['Gender']
const Category = require("../models")['Category']
const Product = require("../models")['Product']
const ProductSize = require("../models")['ProductSize']
const Image = require("../models")['Image']
const Size = require("../models")['Size']
class ProductService {
    static async getAllProducts() {
        return await Gender.findAll({
                include: [ 
                    {
                        model: Category,
                        required: true,
                        include: {
                            model: Product,
                            required: true,
                            include: [
                                {
                                    model: ProductSize,
                                    required: true,
                                    include: [{model: Size}]
                                },
                                {
                                    model: Image,
                                    required: true
                                }
                            ]
                        }
                    }
                ]
            });
    }
    static async getOneProduct(id) {
        return await Product.findByPk(id)
    }
}
module.exports = ProductService