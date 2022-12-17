'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductImage.init({
  }, {
    sequelize,
    modelName: 'ProductImage',
  });
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product)
    ProductImage.hasOne(models.Image)
  }
  return ProductImage;
};