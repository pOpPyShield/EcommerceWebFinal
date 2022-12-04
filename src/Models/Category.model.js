const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
const Gender = require("./Gender.model");

class Category extends Model {
    static classLevelMethod() {
        return 'Category'
    }
}
Category.init({
    IdCat: {
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
}, {sequelize, modelName: "Category", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})
Gender.hasMany(Category)
Category.belongsTo(Gender)
const syncModel = async () => {
    await Category.sync({ force: true });
    console.log("The table for the Category model was just (re)created!");
}
//syncModel()


const categoryNew = Category.build({Name: "Áo khoác", GenderIdGender: 1})
//insertInstance(categoryNew)
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
//insertInstance(categoryNew)
//syncModel()
module.exports = Category