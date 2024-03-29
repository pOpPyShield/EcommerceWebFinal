'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async findAllCarts() {
      return await Cart.findAll()
    }
  }
  Cart.init({
    quantity: DataTypes.INTEGER,
    size: DataTypes.CHAR
  }, {
    sequelize,
    modelName: 'Cart',
  });
  Cart.associate=(models) => {
    Cart.belongsTo(models.Product)
    Cart.hasOne(models.Checkout)
  }
  return Cart;
};