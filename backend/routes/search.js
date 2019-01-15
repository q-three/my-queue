const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/search')


router.post('/music', ctrl.music)
router.post('/video', ctrl.video)
router.post('/games', ctrl.games)
router.post('/places', ctrl.places)
module.exports =  router