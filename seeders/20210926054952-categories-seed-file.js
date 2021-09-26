'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      '動作片',
      '冒險片',
      '喜劇片',
      '劇情片',
      '恐怖片',
      '奇幻片',
      '愛情片',
      '動畫片',
      '驚悚片',
      '懸疑片',
      '科幻片',
      '歌舞劇/音樂片',
      '戰爭片',
      '西部片',
      '史詩片',
      '歷史電影'
    ].map((item, index) => ({
      id: index + 1,
      name: item, 
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    , {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {})
  }
};


