const knex = require('../db/knex')

function checkUser(userId){

}

function checkItem(itemId){

}

function getAll() {
    return knex('q_items')
    .then(result => {
        return result
    })
    .catch(err => {
        throw err
    })
} //get all queue items from q_items table

function getOne(id){
    return knex('q_items')
    .where('id': id)
    .then(([result]) => {
        return result
    })
    .catch(err => {
        throw err
    })
} //get specific queue item by id

function addQueueItem(item){
    // item = {
    //     user_id : req.body.user_id, 
    //     type: req.body.type,
    //     read: false,
    //     starred: false,
    //     url: req.body.url,
    //     img: req.body.img,
    //     referral_id: req.body.referral_id,
    //     desc: req.body.desc
    // }




} //post a new item to a user's queue, preceeded by checkUser as middleware

function starItem(id) {

} //updates queue item to be starred

function deleteItem(id){

} //deletes a queue item


module.exports = {getAll, getOne, addQueueItem, starItem, deleteItem, checkUser, checkItem}