const knex = require('../db/knex')

function addImage(url, id){
  console.log('hitting model')
  return knex('users')
  .where('id', id)
  .update('img', url)
  .returning('*')
}

module.exports = {addImage}