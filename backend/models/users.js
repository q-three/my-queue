const knex = require('../db/knex')
const bcrypt = require('bcrypt')

function signup(f_name, l_name, username, password) {
    username = username.toLowerCase()
    return knex('users')
        .where('username', username)
        .then(([data]) => {
            if (data) throw {
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

function checkFriends(id, friendId) {
    return knex('friends')
        .where(function() {
            this.where('user_id', id).where('friend_id', friendId)
        })
        .orWhere(function() {
            this.where('user_id', friendId).where('friend_id', id)
        })
        .then(([result]) => {
            if(result) throw {error: 400, message: 'Users are already friends'}
            else return false
        })
        .catch(err => {
            throw err
        })
}

function getAll(){
    return knex('users')
        .then(([...data]) => {
            delete data.password
            return data
        })
        .catch(err => {
            throw err
        })
} //get all users

function getUser(id){
    return knex('users')
        .where('id', id)
        .then(([data]) => {
            delete data.password
            return data
        })
        .catch(err => {
            throw err
        })
} //get specific user by id

function addFriend(id, friendId){
    return knex('friends')
        .insert([{'user_id': id, 'friend_id': friendId} ,
            {'user_id': friendId, 'friend_id': id} ])
        .then(() => {
            return getUser(friendId)
        //we expect to return the user's info you are friends with, so do a get for that user and include their f_name for the response
        })
        .catch(err => {
            throw err
        })
} //add a friend to a user's friend-list, makes a friend relation for both users

function getFriends(id){
    return knex('friends')
        .where('user_id', id)
        .then((data)=> {
            const friendsArray = data.map(connection => connection.friend_id)
            return knex('users')
                .whereIn('id', friendsArray)
        })
        .then(result => {
            return result.map(x => {
                delete x.password
                delete x.l_name
                delete x.f_name
                delete x.color
                return x
            })
        })
    //Point here is to get MY list of friends, and return their username, img, and id
} //get friendlist for specific user


function editUser(id, edits){
    return knex('users')
        .where('id', id)
        .then(([user]) => {
            let update = {'img': user.img, 'f_name': user.f_name, 'l_name': user.l_name, 'color': user.color}
            
            if(edits.img) update.img = edits.img
            if(edits.f_name) update.f_name = edits.f_name
            if(edits.l_name) update.l_name = edits.l_name
            if(edits.color) update.color = edits.color

            return knex('users')
                .where('id', id)
                .update(update)
                .returning('*')
                .then(result => {
                    return result
                })
                .catch(err => {
                    throw err
                })
        })
} //edit user's profile

function getUserQueue(id){
    return knex('q_items')
        .innerJoin('users', 'users.id', 'referral_id')
        .where('user_id', id)
        .select('q_items.desc as desc', 'q_items.img as img', 'q_items.id as id', 'q_items.read as read', 
            'q_items.starred as starred', 'q_items.url as url', 'q_items.type as type', 'users.f_name as referral_name') 
        .orderBy('read', 'asc') //added so results are ordered with unread queue items first
        .orderBy('id', 'desc') // added so newest results show up first
        .then(data => {
            return data
        })
        .catch(err => {
            throw err
        })
} //get list of queue items for a specific user

module.exports = {signup, getAll, getUser, addFriend, getFriends, editUser, getUserQueue, checkFriends}