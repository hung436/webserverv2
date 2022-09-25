'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductName: {
        type: Sequelize.STRING
      },
      MetaTitle: {
        type: Sequelize.STRING
      },
      Description: {
        type: Sequelize.STRING
      },
      ProductImage: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.NUMBER
      },
      PromotionPrice: {
        type: Sequelize.NUMBER
      },
      Quantity: {
        type: Sequelize.NUMBER
      },
      CategoryId: {
        type: Sequelize.NUMBER
      },
      Detail: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};