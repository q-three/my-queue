
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, f_name: 'Brendan', l_name: 'Woodell', username: 'beamer92', password: '$2b$10$5t2MCaI.4oXNZc0d1rbTrOhCFTAiSfIj.9c8oQZ58sEQGEa8mkUdq'},
        {id: 2, f_name: 'Brad', l_name: 'Majors', username: 'Arsehole', password: '$2b$10$BA6Xp9.iw3wK433pNVJsQOBV9mOmiIOCuc57oBtf/TNXrHEqRnOPm'}
      
      ])
      .then(() =>{
        return knex.raw(`SELECT setval('users_id_seq', (SELECT max(id) FROM users));`)})
    });
};
