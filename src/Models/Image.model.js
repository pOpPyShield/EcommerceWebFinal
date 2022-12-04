const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
const Product = require("./Product.model");

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

Product.hasMany(Image)
Image.belongsTo(Product)
const syncModel = async () => {
    await Image.sync({ force: true });
    console.log("The table for the Size model was just (re)created!");
}
//syncModel()