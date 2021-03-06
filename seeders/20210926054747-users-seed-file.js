"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "root",
          email: "root@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: true,
          image: "https://i.imgur.com/GIj0Jmy.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user1",
          email: "user1@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: false,
          image: "https://i.imgur.com/AoWJjjh.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user2",
          email: "user2@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: false,
          image: "https://i.imgur.com/aynHRRZ.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user3",
          email: "user3@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: false,
          image: "https://i.imgur.com/6yfcCpY.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user4",
          email: "user4@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: false,
          image: "https://i.imgur.com/3aZKrug.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user5",
          email: "user5@example.com",
          password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10), null),
          role: false,
          image: "https://i.imgur.com/Dw0FLSk.jpeg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
