'use strict';
const {Op} = require("sequelize")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    constructor(userName, password) {
      super()
      this.userName = userName
      this.password = password
    }
    static associate(models) {
      // define association here
    }
    async checkAdmin() {
      const checkAdmin = await Admin.findOne({
            where: {
                [Op.and]: [{userName: this.userName}, {password:this.password}]
            }
      })
      return checkAdmin!=null
    }
  }
  Admin.init({
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};