const model = require('../models/queue')

function checkUser(req,res,next){
    console.log(req.body)
    if(!req.body.id) throw {error: 400, message: 'Need to select a friend!'}
    model.checkUser(req.body.id)
    .then(result => {
        if(result) next()
        else throw {error: 404, message: 'Friend not found, please try again'}
    })
    .catch(err => {
        next(err)
    })
} //check that a user Exists, meant for the user a card is being made FOR, not the user who is creating it

function checkItem(req,res,next){
    model.getOne(req.params.id)
    .then(result => {
        if(result) next()
    })
    .catch(err => {
        next(err)
    })
}

function getAll(req,res,next) {
    model.getAll()
    .then(result => {
        res.status(200).send(result)
    })
    .catch(next)
} //get all queue items from q_items table

function getOne(req,res,next){
    const id = req.params.id
    model.getOne(id)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(next)
} //get specific queue item by id

function addQueueItem(req, res, next){
    if(!req.body.type || !req.body.url || !req.body.referral_id) throw {error: 400, message: 'Missing Q-Card information!'}
    let item = {
        user_id : req.body.user_id, 
        type: req.body.type,
        read: false,
        starred: false,
        url: req.body.url,
        img: req.body.img,
        referral_id: req.body.referral_id,
        desc: req.body.desc
    }

    model.addQueueItem(item)
    .then(result=>{
        res.status(201).send(result)
    })
    .catch(next)
} //post a new item to a user's queue, preceeded by checkUser as middleware

function starItem(req,res,next) {
    model.starItem(req.params.id)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(next)
} //updates queue item to be starred

function readItem(req, res, next){
    model.readItem(req.params.id)
    .then(result => {
        res.status(200).send(result)
    })
    .catch(next)
}
function deleteItem(req,res,next){
    model.deleteItem(req.params.id)
    .then(result => {
        res.status(202).send('That queue item has been Deleted!')
    })
    .catch(next)
} //deletes a queue item


module.exports = {checkUser, getAll, getOne, addQueueItem, starItem, readItem, deleteItem, checkItem}