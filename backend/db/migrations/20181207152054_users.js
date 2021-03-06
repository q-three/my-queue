exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('f_name').notNullable().defaultsTo('');
        table.string('l_name').notNullable().defaultsTo('');
        table.string('username').unique().notNullable().defaultsTo('');
        table.text('img').defaultsTo('');
        table.text('password').notNullable().defaultsTo('');
        table.string('color').notNullable().defaultTo('#C1C1C1')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
