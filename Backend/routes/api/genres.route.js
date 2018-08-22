var express = require('express');

var router = express.Router();

var genresController = require('../../controllers/genres.controller');
var jwtCheck = require('../../auth/jwtCheck');
var adminCheck = require('../../auth/adminCheck');

router.get('/', genresController.getgenres)
router.get('/:id', genresController.getgenre)
router.post('/create',jwtCheck, adminCheck, genresController.creategenre)
router.put('/:id/update',jwtCheck, adminCheck, genresController.updategenre)
router.delete('/:id',jwtCheck, adminCheck, genresController.deletegenre)

module.exports = router;