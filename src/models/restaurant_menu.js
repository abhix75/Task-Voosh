"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant_Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Restaurant_Menu.init(
    {
      MenuID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
      },
      FoodMenu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
          isAlphanumeric: true,
        },
      },
      Price:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Capacity: {
        type: DataTypes.INTEGER,
        allowNUll: false,
        defaultValue: "0",
        validate: {
          max: 800,
        },
      },
    },
    {
      sequelize,
      modelName: "Restaurant_Menu",
    }
  );
  return Restaurant_Menu;
};
