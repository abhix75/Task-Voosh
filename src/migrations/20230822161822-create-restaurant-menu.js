'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Restaurant_Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MenuID:{
        type: Sequelize.INTEGER,
        allowNull: false,
        unique:true,
      },
   
      FoodMenu: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true,
        validate: 
        {
          isAlphanumeric:true,
        }
      },
  
      Capacity: {
        type: Sequelize.INTEGER,
        defaultValue:"0",
        validate:{

          max:800
        }
      },
      Price:{
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('Restaurant_Menus');
  }
};