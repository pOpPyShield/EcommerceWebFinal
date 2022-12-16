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
      'Categories', //Name of source model
      'GenderId', // Name of the key we adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genders', //Name of target model
          key: 'id', //Key in target model that we're referencing
        },
        onDelete: 'SET NULL',
      }
    ).then(async() => {
      await queryInterface.addColumn(
        'Products', 
        'CategoryId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Categories',
            key: 'id'
          },
          onDelete: 'SET NULL'
        }
      )
    }).then(async()=> {
      await queryInterface.addColumn(
        'Products',
        'SizeId',
        {
          type:Sequelize.INTEGER,
          references: {
            model: 'Sizes',
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
    await queryInterface.removeColumn(
      'Categories', //Name of source model
      'GenderId', //Key we want to remove
    ).then( async() => {
      await queryInterface.removeColumn(
        'Products',
        'CategoryId'
      )
    }).then(async() => {
      await queryInterface.removeColumn(
        'Products',
        'SizeId'
      )
    })
  }
};
