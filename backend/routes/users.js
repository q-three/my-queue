const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/users')

router.post('/signup', ctrl.signup)

// router.post('/u/:id/friends') //add friend, /u because I think starting with just /:id will conflict with signup
// router.put('/u/:id') //edit User info
// router.get('/u/:id') //get User
// router.get('/u/:id/queue') //get User's Queue Items



module.exports = router

