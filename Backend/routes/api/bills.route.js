var express = require('express');
var router = express.Router();

var billController = require('../../controllers/bills.controller');
var jwtCheck = require('../../auth/jwtCheck');
var adminCheck = require('../../auth/adminCheck');

router.get('/', billController.getbills);
router.get('/:id', billController.getbill);
router.post('/create', billController.createbill);
router.put('/:id/update', jwtCheck, adminCheck, billController.updatebill);
router.delete('/:id', jwtCheck, billController.deletebill);

module.exports = router;