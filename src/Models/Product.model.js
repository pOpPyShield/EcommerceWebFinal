const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
const Category = require("./Category.model");
const Gender = require("./Gender.model")
const Size = require("./Size.model")
const Image = require("./Image.model")
class Product extends Model {
    static classLevelMethod() {
        return 'Product'
    }
}
Product.init({
    IdProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
}, {sequelize, modelName: "Product", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})

//Category.hasMany(Product)
//Product.belongsTo(Category)
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
                    required: true
                }
            }
        ]
    });
    // Now the ship comes with it
    console.log(JSON.stringify(products, null, 2))
}
//eagerLoading()
module.exports = Product