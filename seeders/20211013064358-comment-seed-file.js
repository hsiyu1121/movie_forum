'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {   
    await queryInterface.bulkInsert('Comments', 
      Array.from({ length: 100 }).map((d, i) => ({
        text: faker.lorem.paragraph(),
        UserId: Math.floor(Math.random() * 6) + 1,
        MovieId:  Math.floor(Math.random() * 80) + 1,
      })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {})
  }
};
