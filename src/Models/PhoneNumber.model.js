const { DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize");
class PhoneNumber extends Model {
    static classLevelMethod() {
        return 'PhoneNumber'
    }
}
PhoneNumber.init({
    PhoneNumber: {
        type: DataTypes.CHAR,
        allowNull: false
    },
}, {sequelize, modelName: "PhoneNumber", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})
module.exports=PhoneNumber