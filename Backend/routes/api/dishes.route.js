var express = require('express')

var router = express.Router()

// Getting the menu Controller that we just created

var dishController = require('../../controllers/dishes.controller');


// Map each API to the Controller FUnctions

router.get('/', dishController.getdishes)
router.get('/create', dishController.createdish_get) // have to put this ahead of id route otherwise never route to this path
router.post('/create', dishController.createdish_post)
router.get('/:id', dishController.getdish)
router.put('/:id/update', dishController.updatedish)
router.delete('/:id', dishController.deletedish)


// Export the Router

module.exports = router;