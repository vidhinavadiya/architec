'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {

    const hashedPassword = await bcrypt.hash('5028_@V_I_D_H_I@_5532', 10);

    await queryInterface.bulkInsert('Admins', [{
      name: 'architec',
      email: 'nd7046@architec.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', {
      email: 'vidhinavadiya4@gmail.com'
    }, {});
  }
};
