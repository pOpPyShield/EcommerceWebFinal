'use strict';
const Cart = require("../models/index")['Cart']
const Customer = require("../models/index")['Customer']
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
    await queryInterface.bulkInsert('Customers', [{
      name: "Get it done",
      address: "620 Nguyen Tat Thanh, SOn Tra, Da Nang",
      phoneNumber: "+812366412",
      createdAt: new Date(),
      updatedAt: new Date()
    }])
    var carts = await Cart.findAllCarts()
    var customers = await Customer.findAllCustomers()
    await queryInterface.bulkInsert('Checkouts', [{
      CartId: carts[0].id,
      CustomerId: customers[0].id,
      total: 800000,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Customers', null, 2)
    await queryInterface.bulkDelete('Checkouts', null, 2)
  }
};
