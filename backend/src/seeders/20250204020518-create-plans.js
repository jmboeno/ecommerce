"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("plans", [
      {
        provider_id: 1,
        name: "Express 30 Days",
        price: 21.99,
        duration_days: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provider_id: 2,
        name: "Blue 30 Days",
        price: 11.99,
        duration_days: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        provider_id: 3,
        name: "Dune 30 Days",
        price: 18.99,
        duration_days: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("plans", null, {});
  },
};