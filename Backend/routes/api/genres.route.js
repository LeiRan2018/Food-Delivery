var express = require('express');

var router = express.Router();

var genresController = require('../../controllers/genres.controller');

router.get('/', genresController.getgenres)
router.get('/:id', genresController.getgenre)
router.post('/create', genresController.creategenre)
router.put('/:id/update', genresController.updategenre)
router.delete('/:id', genresController.deletegenre)

module.exports = router;