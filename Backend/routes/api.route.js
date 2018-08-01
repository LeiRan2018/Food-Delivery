var express = require('express')

var router = express.Router()
var menus = require('./api/menus.route')
var dishes = require('./api/dishes.route')
var customers = require('./api/customers.route')
var genres = require('./api/genres.route')
var bills = require('./api/bills.route')

router.use('/menus', menus);
router.use('/dishes', dishes);
router.use('/customers', customers);
router.use('/genres', genres);
router.use('/bills', bills);

module.exports = router;