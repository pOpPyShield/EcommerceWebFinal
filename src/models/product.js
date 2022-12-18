'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async findAllProducts() {
      return await Product.findAll()
    }
  }
  Product.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.CHAR,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Category)
    Product.belongsToMany(models.Size, {through: models.ProductSize})
    Product.hasMany(models.ProductSize)
    Product.hasMany(models.Image)
    Product.hasMany(models.Cart)
  }
  return Product;
};