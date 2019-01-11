const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/queue')


// router.get('/') //get all queue items
// router.get('/:id') //get specific queue item
// router.post('/') //post a new queue item (user id will be in body)
// router.put('/:id') //edit queue item (Starring)
// router.delete('/:id') //delete queue item


module.exports = router

//------Optional routes --------
//then IF we needed to get a specific queue item, 
    //  router.get('/u/:id/queue/:qid')

