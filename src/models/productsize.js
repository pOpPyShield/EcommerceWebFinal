'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async createProductSizes() {

    }
  }
  ProductSize.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: true
    } 
  }, {
    sequelize,
    modelName: 'ProductSize',
  });
  ProductSize.associate = (models) => {
    ProductSize.belongsTo(models.Product)
  }
  return ProductSize;
};