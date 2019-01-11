const model = require('../models/users')

function signup(req, res, next) {
    console.log(req.body, '================')
    const {f_name, l_name, username, password, passwordMatch } = req.body

    if (!username || !password || !f_name || !l_name || password !== passwordMatch){
        console.log(username, password, f_name, l_name, passwordMatch)
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


function getAll(req,res,next){

} //get all users

function getUser(req,res,next){

} //get specific user by id

function addFriend(req,res,next){

} //add a friend to a user's friend-list, makes a friend relation for both users

function getFriends(req,res,next){

} //get friendlist for specific user

function editUser(req,res,next){

} //edit user's profile

function getUserQueue(req,res,next){

} //get list of queue items for a specific user

module.exports = {signup, getAll, getUser, addFriend, getFriends, editUser, getUserQueue}