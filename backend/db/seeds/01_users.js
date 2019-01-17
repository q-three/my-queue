
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, f_name: 'Brendan', l_name: 'Woodell', username: 'beamer92', color:'#44db23', password: '$2b$10$Zor7V9BuLUOvxzWKosYnkulIBYGYHPUiOn0LbKT0K4B3IE9kQjxeW'}, //Asd123123
        {id: 2, f_name: 'Brad', l_name: 'Majors', username: 'bmajors', color:'#299cd1', password: '$2b$10$BA6Xp9.iw3wK433pNVJsQOBV9mOmiIOCuc57oBtf/TNXrHEqRnOPm'}, //superduper
        {id: 3, f_name: 'Janet', l_name: 'Weiss', username: 'janet', color:'#f442ee', password: '$2b$10$O4IEISVz4xAKiyPsqyuUiut/mSZTwkcOj/U2lIlCZn6ZQW9CHHbVq'} //Janet123
      ])
      .then(() =>{
        return knex.raw(`SELECT setval('users_id_seq', (SELECT max(id) FROM users));`)})
    });
};
