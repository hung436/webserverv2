"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.hasMany(models.Size, { foreignKey: "id_product" });
    }
  }
  Product.init(
    {
      ProductName: DataTypes.STRING,
      MetaTitle: DataTypes.STRING,
      Description: DataTypes.STRING,
      ProductImage: DataTypes.STRING,
      Price: DataTypes.INTEGER,
      PromotionPrice: DataTypes.INTEGER,
      Quantity: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      Detail: DataTypes.STRING,
      Status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
