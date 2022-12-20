const Gender = require("../models/index")['Gender']
const Category = require("../models/index")['Category']
class CategoryService {
    static async getAllCategories() {
        return await Category.findAll({
            include: [{
                    model: Gender,
                    required: true
                }
            ]
        })
    }
}   
module.exports = CategoryService