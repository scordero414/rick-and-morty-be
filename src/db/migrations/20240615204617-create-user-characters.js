'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'user_characters',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        characterId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'characters',
            key: 'id',
          },
        },
        isFavorite: {
          type: Sequelize.BOOLEAN,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        indexes: [{ unique: true, fields: ['userId', 'characterId'] }],
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_characters');
  },
};
