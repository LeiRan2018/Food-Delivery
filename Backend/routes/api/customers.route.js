var express = require('express');

var router = express.Router();

var customerController = require('../../controllers/customers.controller');

router.get('/', customerController.getcustomers);
router.get('/:id', customerController.getcustomer);
router.post('/create', customerController.createcustomer);
router.patch('/:id/update', customerController.updatecustomer);
router.delete('/:id', customerController.deletecustomer)

module.exports = router;