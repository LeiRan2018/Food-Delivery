var express = require('express')

var router = express.Router()

// Getting the menu Controller that we just created

var menuController = require('../../controllers/menus.controller');


// Map each API to the Controller FUnctions

router.get('/', menuController.getmenus)
router.get('/:id', menuController.getmenu)
router.post('/', menuController.createmenu)
router.put('/', menuController.updatemenu)
router.delete('/:id',menuController.removemenu)

// Export the Router

module.exports = router;