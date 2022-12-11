const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
const PhoneNumber = require("./PhoneNumber.model")
const Product = require("./Product.model")
class CustomerOrder extends Model {
    static classLevelMethod() {
        return 'CustomerOrder'
    }
}
CustomerOrder.init({
    IdCustomer: {
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
        allowNull: true
    },
    Size: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    Quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    Address: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {sequelize, modelName: "CustomerOrder", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})
CustomerOrder.hasMany(PhoneNumber)
PhoneNumber.belongsTo(CustomerOrder)
module.exports = CustomerOrder