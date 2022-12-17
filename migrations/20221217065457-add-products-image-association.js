'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'ProductImages',
      'ProductId', 
      {
          type: Sequelize.INTEGER,
          references: {
            model: 'Products',
            key: 'id'
          },
          onDelete: 'SET NULL'
      }
    ).then(async() => {
      await queryInterface.addColumn(
        'ProductImages',
        'ImageId', 
        {
            type: Sequelize.INTEGER,
            references: {
              model: 'Images',
              key: 'id'
            },
            onDelete: 'SET NULL'
        }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
