var express = require('express')

var router = express.Router()

var dishinstanceController = require('../../controllers/dishinstances.controller')

router.get('/', dishinstanceController.getdishinstances)
router.get('/:id', dishinstanceController.getdishinstance)
router.post('/create', dishinstanceController.createdishinstance)
router.patch('/:id/update', dishinstanceController.updatedishinstance)
router.delete('/:id', dishinstanceController.deletedishinstance)
module.exports = router;