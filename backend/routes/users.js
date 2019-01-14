const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')
const Qctrl = require('../controllers/queue')
const Actrl = require('../controllers/auth')

router.post('/signup', ctrl.signup)

router.get('/u', ctrl.getAll) //get All Users
router.get('/u/:id', ctrl.getUser) //get User
router.post('/u/:id/friends', Qctrl.checkUser, ctrl.checkFriends, ctrl.addFriend) //add friend, /u because I think starting with just /:id will conflict with signup
router.get('/u/:id/friends', ctrl.getFriends) //get friends list
router.put('/u/:id', ctrl.editUser) //edit User info
router.get('/u/:id/queue', ctrl.getUserQueue) //get User's Queue Items



module.exports = router

