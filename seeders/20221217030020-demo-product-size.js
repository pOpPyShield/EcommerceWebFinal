'use strict';

const ProductSize = require('../models/index')['ProductSize'];

const Product = require('../models/index')['Product'];
const Size = require('../models/index')['Size']
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    var products = await Product.findAllProducts()
    var sizes = await Size.findAllSizes()
    for (let i = 0; i<products.length;i++) {
      for (let z = 0; z<sizes.length;z++) {
        await queryInterface.bulkInsert('ProductSizes', [{
          ProductId: products[i].id,
          SizeId: sizes[z].id,
          quantity: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }])
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ProductSizes', null, {})
  }
};
