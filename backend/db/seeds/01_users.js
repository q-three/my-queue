
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, f_name: 'Brendan', l_name: 'Woodell', username: 'beamer92', color:'#44db23', password: '$2b$10$O7QKsP01/HyQYoatiuITCe20lNEezFMDNtaOo1kSWdQb8Vd8IfPoO'}, //123123123
        {id: 2, f_name: 'Brad', l_name: 'Majors', username: 'bmajors', color:'#299cd1', password: '$2b$10$BA6Xp9.iw3wK433pNVJsQOBV9mOmiIOCuc57oBtf/TNXrHEqRnOPm'}, //superduper
        {id: 3, f_name: 'Janet', l_name: 'Weiss', username: 'janet', color:'#f442ee', password: '$2b$10$Jmo.mKYZUNC0yiaWdxvCXOnSmhJJJMk..k48WUKYJnanPfVv6Twmm'} //janet123
      ])
      .then(() =>{
        return knex.raw(`SELECT setval('users_id_seq', (SELECT max(id) FROM users));`)})
    });
};
