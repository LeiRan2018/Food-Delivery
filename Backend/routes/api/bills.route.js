var express = require('express');
var router = express.Router();

var billController = require('../../controllers/bills.controller');

router.get('/', billController.getbills);
router.get('/:id', billController.getbill);
router.post('/create', billController.createbill);
router.patch('/:id/update', billController.updatebill);
router.delete('/:id', billController.deletebill);

module.exports = router;