'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Projects', [{
      title: 'Website Portofolio',
      description: 'Website portofolio pribadi menggunakan React dan Node.js',
      url: 'https://github.com',
      url_demo: 'https://demo.com',
      url_github: 'https://github.com',
      tech_stack: 'React, Express, MySQL',
      user_id: 1, // Foreign Key ke User ID 1
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {});
  }
};