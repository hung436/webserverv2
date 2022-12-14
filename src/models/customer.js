"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init(
    {
      Name: DataTypes.STRING,
      avatar: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      id_facebook: DataTypes.STRING,
      RoleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
