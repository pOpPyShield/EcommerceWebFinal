'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checkout.init({
    total: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Checkout',
  });
  Checkout.associate = (models) => {
    Checkout.belongsTo(models.Cart)
    Checkout.belongsTo(models.Customer)
  }
  return Checkout;
};