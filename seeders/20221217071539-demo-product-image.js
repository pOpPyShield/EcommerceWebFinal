'use strict';

const Image = require('../models/index')['Image'];

const Product = require('../models/index')['Product'];
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
    await queryInterface.bulkInsert('Images', [{
      path: "imgSp1",
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: products[0].id
    },
    {
      path: "imgSp2",
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: products[0].id
    },
    {
      path: "imgSp3",
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: products[0].id
    },
    {
      path: "imgSp4",
      createdAt: new Date(),
      updatedAt: new Date(),
      ProductId: products[0].id
    }])
    /*
    await queryInterface.bulkCreate('ProductImages', [{
      ProductId: products[0].id,
      ImageId: JSON.stringify(images, null, 2),
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Images', null, {})
  }
};
