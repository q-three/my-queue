const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/queue')


router.get('/', ctrl.getAll) //get all queue items
router.get('/:id', ctrl.getOne) //get specific queue item
router.post('/', ctrl.checkUser, ctrl.addQueueItem) //post a new queue item (user id will be in body)
router.put('/:id', ctrl.starItem) //edit queue item (Starring)
router.delete('/:id', ctrl.deleteItem) //delete queue item


module.exports = router

//------Optional routes --------
//then IF we needed to get a specific queue item, 
    //  router.get('/u/:id/queue/:qid')
