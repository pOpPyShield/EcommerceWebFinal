const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../Config/DatabaseConfig");
const CustomerOrder = require("./CustomerOrder.model");
const Product = require("./Product.model");

class Checkout extends Model {
    static classLevelMethod() {
        return 'Checkout'
    }
}
Checkout.init({
    IdCheckout: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
}, {sequelize, modelName: "Checkout", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})
CustomerOrder.belongsToMany(Product, {through: 'Checkout'})
Product.belongsToMany(CustomerOrder, {through: 'Checkout'})
module.exports = Checkout