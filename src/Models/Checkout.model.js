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
    CustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CustomerOrder,
            key: 'IdCustomer'
        }
    },
    ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'IdProduct'
        }
    } 
}, {sequelize, modelName: "Checkout", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})
module.exports = Checkout