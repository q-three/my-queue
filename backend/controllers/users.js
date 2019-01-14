const model = require('../models/users')

function signup(req, res, next) {
    const {f_name, l_name, username, password, passwordMatch } = req.body
    if (!username || !password || !f_name || !l_name || password !== passwordMatch){
        return next({status: 400, message: 'Signup error'})
    } 

    return model.signup(f_name, l_name, username, password)
        .then(([data]) => {
            if (!data) return next({
                status: 500,
                message: 'Something went wrong'
            })
            res.status(201).send({
                message: `Account created for ${data}`
            })
        })
        .catch(next)
}

function checkFriends(req,res,next){
    const id = req.params.id
    const friend = req.body.id

    model.checkFriends(id, friend)
    .then(result => {
        if(result === false) return next()
        throw {error: 400, message: `ERROR ${result}`} //I don't think this can get here, but just in case
    })
    .catch(next)
} //this is to ensure that a friend relationship doesn't already exist between the two


function getAll(req,res,next){
    model.getAll()
    .then(result => {
        res.status(200).send(result.data)
    })
    .catch(next)
} //get all users

function getUser(req,res,next){
    const id = req.params.id
    model.getUser(id)
    .then(result => {
        res.status(200).send(result.data)
    })
    .catch(next)
} //get specific user by id

function addFriend(req,res,next){
    const id = req.params.id
    const friend = req.body.id
    model.addFriend(id, friend)
    .then(result=>{
        res.status(201).send(`You and ${result.data.f_name} are now friends!`)
    })
    .catch(next)
} //add a friend to a user's friend-list, makes a friend relation for both users

function getFriends(req,res,next){
    const id = req.params.id
    model.getFriends(id)
    .then(result => {
        res.status(200).send(result.data)
    })
    .catch(next)
} //get friendlist for specific user

function editUser(req,res,next){
    const id=req.params.id
////////////////////////////////////////////////////////////////
    const edits = {} //Edit Body here
/////////////////////////////////////////////////////////////////
    model.editUser(id, edits)
    .then(result => {
        res.status(200).send(result.data)
    })
    .catch(next)
} //edit user's profile

function getUserQueue(req,res,next){
    const id = req.params.id
    model.getUserQueue(id)
    .then(result => {
        res.status(200).send(result.data)
    })
    .catch(next)
} //get list of queue items for a specific user

module.exports = {signup, getAll, getUser, addFriend, getFriends, editUser, getUserQueue, checkFriends}