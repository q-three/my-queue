
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, f_name: 'Brendan', l_name: 'Woodell', username: 'beamer92', color:'#44db23', password: '$2b$10$Qd5hkWLdCecMtukLEVGP6O9RuUcHcX5ZMeEvYDC2vsENVLNgTDV3u'},
        {id: 2, f_name: 'Brad', l_name: 'Majors', username: 'bmajors', color:'#299cd1', password: '$2b$10$BA6Xp9.iw3wK433pNVJsQOBV9mOmiIOCuc57oBtf/TNXrHEqRnOPm'},
        {id: 3, f_name: 'Janet', l_name: 'Weiss', username: 'janet', color:'#f442ee', password: '$2b$10$79UkVjSXD1cVOwBr/7Z58OO/r.8fWk.JxV1jWF75WJRIbFKMMgx6m'}
      ])
      .then(() =>{
        return knex.raw(`SELECT setval('users_id_seq', (SELECT max(id) FROM users));`)})
    });
};
