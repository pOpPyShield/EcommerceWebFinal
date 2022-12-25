'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async findAllGenders() {
       return await Gender.findAll()
    }
  }
  Gender.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        checkName(value) {
          if(!(value.length > 1 && value.length <= 100)) {
            throw new Error("Gender name can't be empty or less than one character")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Gender',
  });
  Gender.associate = (models) => {
    Gender.hasMany(models.Category)
  }
  return Gender;
};