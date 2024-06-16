'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.createTable('characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      name: {
        type: sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: sequelize.ENUM('Alive', 'Dead', 'Unknown'),
        allowNull: false,
      },
      species: {
        type: sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: sequelize.ENUM('Female', 'Male', 'Genderless', 'Unknown'),
        allowNull: false,
      },
      origin: {
        type: sequelize.STRING,
        allowNull: true,
      },
      location: {
        type: sequelize.STRING,
        allowNull: true,
      },
      image: {
        type: sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('characters');
  },
};
