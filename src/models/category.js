'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async findAllCategory() {
      return await Category.findAll()
    }
  }
  Category.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        checkName(value) {
          if(!(value.length > 1 && value.length <= 100)) {
            throw new Error("Category name can't be empty or less than one character")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  Category.associate = (models) => {
    Category.belongsTo(models.Gender) 
    Category.hasMany(models.Product)
  }
  return Category;
};