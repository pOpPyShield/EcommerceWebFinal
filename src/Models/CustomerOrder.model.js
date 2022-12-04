const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
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
        allowNull: false
    },
}, {sequelize, modelName: "CustomerOrder", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})
//CustomerOrder.hasMany(PhoneNumber)
//PhoneNumber.belongsTo(CustomerOrder)
//CustomerOrder.belongsToMany(Product, {through: 'Checkout'})
//Product.belongsToMany(CustomerOrder, {through: 'Checkout'})
module.exports = CustomerOrder
const syncModel = async() => {
    await CustomerOrder.sync({ force: true });
    console.log("The table for the CustomerOrder model was just (re)created!");
    await PhoneNumber.sync({force: true})
    console.log("The table for the PhoneNumber model was just (re)created!");
    await Product.sync({})
}