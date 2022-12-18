'use strict';

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
    await queryInterface.bulkInsert('Sizes', [{
      name: 'M',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'S',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'L',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'XL',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Sizes', null, {})
  }
};
