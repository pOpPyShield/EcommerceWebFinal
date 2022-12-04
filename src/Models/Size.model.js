const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
const Product = require("./Product.model");

class Size extends Model {
    static classLevelMethod() {
        return 'Size'
    }
}
Size.init({
    IdSize: {
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
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {sequelize, modelName: "Size", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})

Product.hasMany(Size)
Size.belongsTo(Product)
const syncModel = async () => {
    await Size.sync({ force: true });
    console.log("The table for the Size model was just (re)created!");
}
//syncModel()