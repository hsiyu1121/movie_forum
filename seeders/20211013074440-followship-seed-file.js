"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Followships",
      Array.from({ length: 6 }).map((d, i) => ({
        followerId: Math.floor(Math.random() * 6) + 1,
        followingId: Math.floor(Math.random() * 5) + 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Followships", null, {});
  },
};
