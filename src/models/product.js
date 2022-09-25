'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    ProductName: DataTypes.STRING,
    MetaTitle: DataTypes.STRING,
    Description: DataTypes.STRING,
    ProductImage: DataTypes.STRING,
    price: DataTypes.NUMBER,
    PromotionPrice: DataTypes.NUMBER,
    Quantity: DataTypes.NUMBER,
    CategoryId: DataTypes.NUMBER,
    Detail: DataTypes.STRING,
    status: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};