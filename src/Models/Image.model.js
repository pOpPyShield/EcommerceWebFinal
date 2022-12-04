const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
const Product = require("./Product.model");
const Gender = require("./Gender.model")
const Category = require("./Category.model")
const Size = require("./Size.model")
class Image extends Model {
    static classLevelMethod() {
        return 'Size'
    }
}
Image.init({
    Path: {
        type: DataTypes.CHAR,
        allowNull: false
    },
}, {sequelize, modelName: "Image", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})

//Product.hasMany(Image)
//Image.belongsTo(Product)
const newImagePath = new Image({Path: "/Static/Prod2", ProductIdProduct: 1})
const eagerLoading = async() => {
    const products  = await Gender.findAll({
        where: {
            Name: "Thời trang nam"
        },
        include: [ 
            {
                model: Category,
                required: true,
                where: {
                    Name: "Áo khoác"
                },
                include: {
                    model: Product,
                    required: true,
                    include: [
                        {
                            model: Size,
                            required: true
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
    // Now the ship comes with it
    console.log(JSON.stringify(products, null, 2))
}
//eagerLoading()
module.exports = Image