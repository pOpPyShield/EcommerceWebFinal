const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
const Category = require("./Category.model");
const Gender = require("./Gender.model")

class Product extends Model {
    static classLevelMethod() {
        return 'Category'
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
const syncModel = async () => {
    await Product.sync({ force: true });
    console.log("The table for the Product model was just (re)created!");
}
//syncModel()
const productNew = new Product({Name: "Áo nỉ, áo khoác hoodie gấu scrub siêu ngầu", Description: "Ao dep cho mua dong khong lanh\r\nCo The dung", Price: 550000, CategoryIdCat: 1})
//insertInstance(productNew)
const eagerLoading = async() => {
    const products  = await Gender.findAll({
        where: {
            Name: "Thời trang nam"
        },
            include: Category
    });
    // Now the ship comes with it
    console.log(JSON.stringify(products, null, 2))
}
//eagerLoading()
module.exports = Product
/*
const eagerLoading = async() => {
    const products  = await Gender.findAll({
        where: {
            Name: "Thời trang nam"
        },
            include: Category
    });
    // Now the ship comes with it
    console.log(JSON.stringify(products, null, 2))
}
eagerLoading()
*/
//insertInstance(categoryNew)
//syncModel()