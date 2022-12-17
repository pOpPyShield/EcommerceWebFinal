'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async findAllSizes() {
       return await Size.findAll()
    }
  }
  Size.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Size',
  });
  Size.associate = (models) => {
    Size.belongsToMany(models.Product, {through: models.ProductSize})
    Size.hasMany(models.ProductSize)
  }
  return Size;
};