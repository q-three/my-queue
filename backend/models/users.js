const knex = require('../db/knex')
const bcrypt = require('bcrypt')

function signup(f_name, l_name, username, password) {
    username = username.toLowerCase()
    return knex('users')
        .where('username', username)
        .then(([data]) => {
            if (!!data) throw {
                status: 400,
                message: 'Username already in use'
            }
            return bcrypt.hash(password, 10)
        })
        .then(hashedPW => {
            return knex('users')
                .insert({
                    f_name,
                    l_name,
                    username,
                    password: hashedPW
                })
                .returning('users.username')
        })
}

function getAll(){

} //get all users

function getUser(id){

} //get specific user by id

function addFriend('?'){

} //add a friend to a user's friend-list, makes a friend relation for both users

function getFriends(id){

} //get friendlist for specific user

function editUser(id, edits){

} //edit user's profile

function getUserQueue(id){

} //get list of queue items for a specific user


module.exports = {signup, getAll, getUser, addFriend, getFriends, editUser, getUserQueue}