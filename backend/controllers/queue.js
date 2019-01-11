const models = require('../models/queue')

function checkUser(req,res,next){

} //check that a user Exists, meant for the user a card is being made FOR, not the user who is creating it

function getAll(req,res,next) {

} //get all queue items from q_items table

function getOne(req,res,next){

} //get specific queue item by id

function addQueueItem(req, res, next){

} //post a new item to a user's queue, preceeded by checkUser as middleware

function starItem(req,res,next) {

} //updates queue item to be starred

function deleteItem(req,res,next){

} //deletes a queue item


module.exports = {checkUser, getAll, getOne, addQueueItem, starItem, deleteItem}