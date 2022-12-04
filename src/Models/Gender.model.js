const { DataTypes, Sequelize, Model } = require("sequelize");
const {sequelize, insertInstance} = require("../Config/DatabaseConfig")
const {Op} = require("sequelize")

class Gender extends Model {
    static classLevelMethod() {
        return 'Gender'
    }
}
Gender.init({
    IdGender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    Name: {
        type: DataTypes.CHAR,
        allowNull: false,
    }
}, {sequelize, modelName: "Gender", freezeTableName: true, timestamps: true, createdAt: false, updatedAt: 'updateTimestamp'})
module.exports = Gender