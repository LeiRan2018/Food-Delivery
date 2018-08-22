var express = require('express')

var router = express.Router()

var dishController = require('../../controllers/dishes.controller');
var jwtCheck = require('../../auth/jwtCheck');
var adminCheck = require('../../auth/adminCheck');

router.get('/', dishController.getdishes)
router.post('/create', jwtCheck, adminCheck, dishController.createdish_post)
router.get('/:id', dishController.getdish)
router.put('/:id/update', jwtCheck, adminCheck, dishController.updatedish)
router.delete('/:id', jwtCheck, adminCheck, dishController.deletedish)


// Export the Router

module.exports = router;