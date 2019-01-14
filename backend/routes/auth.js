const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/auth')

router.get('/token', ctrl.authenticate, ctrl.authStatus)
router.post('/token', ctrl.login)

module.exports = router