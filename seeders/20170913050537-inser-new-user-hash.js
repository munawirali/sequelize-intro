'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: '2bd6e359724b48b5c19c8fec42e172bded8a08d9104e5f7c456aaaa00f8c521d',
        role: 'headmaster',
        salt: 'HmnbGYz9T',
        createdAt : new Date(),
        updatedAt : new Date()
      }],
    {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
