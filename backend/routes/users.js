const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')

router.post('/signup', ctrl.signup)

router.get('/u', ctrl.getAll) //get All Users
router.post('/u/:id/friends', ctrl.addFriend) //add friend, /u because I think starting with just /:id will conflict with signup
router.get('/u/:id/friends', ctrl.getFriends) //get friends list
router.put('/u/:id', ctrl.editUser) //edit User info
router.get('/u/:id', ctrl.getUser) //get User
router.get('/u/:id/queue', ctrl.getUserQueue) //get User's Queue Items



module.exports = router

