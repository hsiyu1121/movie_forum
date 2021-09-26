'use strict';
const movies = require('../movies.json').results

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Movies', 
      Array.from({ length: movies.length }).map((d, i) => ({
        title: movies[i].title,
        description: movies[i].description,
        release_date: movies[i].release_date,
        image: 'https://movie-list.alphacamp.io/posters/' + movies[i].image,
        CategoryId: Math.floor(Math.random() * 15) + 1,
        createdAt: new Date(),
        updatedAt: new Date()    
      })
    ),{})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
