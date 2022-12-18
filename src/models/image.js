'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async findAllImages() {
      return await Image.findAll()
    }
  }
  Image.init({
    path: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Image',
  });
  Image.associate = (models) => {
    //Image.hasOne(models.ProductImage)
    //Image.belongsToMany(models.Product, {through: models.ProductImage})
    //Image.hasOne(models.ProductImage)
    Image.belongsTo(models.Product)
  }
  return Image;
};