const knex = require('../db/knex')

function checkUser(userId){
    return knex('users')
    .where('id', userId)
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
}

function getAll() {
    return knex('q_items')
    .orderBy('read', 'desc') //added so results are ordered with unread queue items first
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
} //get all queue items from q_items table

function getOne(id){
    return knex('q_items')
    .where('id', id)
    .then(([result]) => {
        if(!result) throw {error:404, message: 'That queue item does not exist!'}
        return result
    })
    .catch(err => {
        throw err
    })
} //get specific queue item by id

function addQueueItem(item){
    return knex('q_items')
    .insert(item)
    .returning('*')
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
} //post a new item to a user's queue, preceeded by checkUser as middleware

function starItem(id) {
    return getOne(id)
    .then(result => {
        return knex('q_items')
        .where('id', id)
        .update('starred', !result.starred)
        .returning('*')
    })
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
} //updates queue item to be starred

function readItem(id){
    return getOne(id)
    .then(result => {
        return knex('q_items')
        .where('id', id)
        .update('read', true)
        .returning('*')
    })
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
}

function deleteItem(id){
    return knex('q_items')
    .where('id', id)
    .del()
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
} //deletes a queue item


module.exports = {getAll, getOne, addQueueItem, starItem, readItem, deleteItem, checkUser}