exports.up = function(knex, Promise) {
    return knex.schema.createTable('friends', table => {
        table.increments();
        table.integer('user_id').references('users.id').onDelete('CASCADE').notNullable();
        table.integer('friend_id').references('users.id').onDelete('CASCADE').notNullable();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('friends')
};