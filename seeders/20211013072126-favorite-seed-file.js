"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Favorites",
      Array.from({ length: 100 }).map((d, i) => ({
        UserId: Math.floor(Math.random() * 6) + 1,
        MovieId: Math.floor(Math.random() * 80) + 1,
      })),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Favorites", null, {});
  },
};
