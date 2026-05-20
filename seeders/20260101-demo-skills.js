'use strict';

module.exports = {
async up (queryInterface, Sequelize) {
  return queryInterface.bulkInsert('Skills', [{
    name: 'JavaScript',
    level: 90,
    category: 'Frontend',
    user_id: 1
    // ✅ HAPUS: createdAt: new Date(), updatedAt: new Date()
  }, {
    name: 'Node.js',
    level: 85,
    category: 'Backend',
    user_id: 1
  }, {
    name: 'MySQL',
    level: 80,
    category: 'Database',
    user_id: 1
  }], {});
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Skills', null, {});
  }
};