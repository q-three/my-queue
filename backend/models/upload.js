const knex = require('../db/knex')

function addImage(url, id){
    return knex('users')
        .where('id', id)
        .update('img', url)
        .returning('*')
}

module.exports = {addImage}