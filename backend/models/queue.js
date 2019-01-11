const knex = require('../db/knex')

function getAll() {

} //get all queue items from q_items table

function getOne(id){

} //get specific queue item by id

function addQueueItem(origUserId, toUserId, item){

} //post a new item to a user's queue, preceeded by checkUser as middleware

function starItem(id) {

} //updates queue item to be starred

function deleteItem(id){

} //deletes a queue item


module.exports = {getAll, getOne, addQueueItem, starItem, deleteItem}