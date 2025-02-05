"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("payments", [
      {
        recharge_id: 1,
        amount: 21.99 ,
        payment_method: "Cartão de credito",
        transaction_id: "ABCD198298",
        status: "pendding",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recharge_id: 1,
        amount: 21.99 ,
        payment_method: "Cartão de credito",
        transaction_id: "ABCD192348",
        status: "processed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        recharge_id: 1,
        amount: 21.99,
        payment_method: "Pix",
        transaction_id: "ABCD192321",
        status: "failed",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("payments", null, {});
  },
};