"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Product",
      [
        {
          ProductName: "Pizza Hải sản",
          MetaTitle: "",
          Description: "Thành phần Jam bông, dứa, sốt cà chua, phô mai",
          ProductImage: "/public/klsahkjds.png",
          price: 2000000,
          PromotionPrice: 1000000,
          Quantity: DataTypes.INTEGER,
          CategoryId: DataTypes.INTEGER,
          Detail: DataTypes.STRING,
          status: DataTypes.INTEGER,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
