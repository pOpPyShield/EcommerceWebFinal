'use strict';

var Product = require("../models/index")['Product']
var Category = require("../models/index")['Category']
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
    var categories = await Category.findAllCategory()
    await queryInterface.bulkInsert('Products',[{
      name: "ÁO NỈ, ÁO KHOÁC HOODIE GẤU SCRUB SIÊU NGẦU NAM NỮ PHONG CÁCH CAO CẤP - DUBATI FASHION",
      price: 150000,
      CategoryId: categories[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Áo Khoac Bomber Nam Dáng Thể  Thao Thời Trang ZenkcosMenJK022",
      price: 200000,
      CategoryId: categories[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Áo Khoác Dù Nam Hai Mặt Cực Đẹp",
      price: 250000,
      CategoryId: categories[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ao Khoac Nam Theu Logo Cao Cap Chat Du 2 Lop Day Dan Thoai Mai Di Mua Nang",
      price: 300000,
      CategoryId: categories[0].id,
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
    await queryInterface.bulkDelete('Products', null, {})
  }
};
