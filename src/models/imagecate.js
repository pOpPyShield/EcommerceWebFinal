'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageCate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category)
    }
  }
  ImageCate.init({
    path: DataTypes.STRING,
    ext: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImageCate',
  });
  return ImageCate;
};