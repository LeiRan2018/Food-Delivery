// Accessing the Service that we just created

var menuService = require('../services/menu.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getmenus = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var menus = await menuService.getmenus({}, page, limit)
        
        // Return the menus list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: menus, message: "Succesfully menus Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createmenu = async function(req, res, next){

    // Req.Body contains the form submit values.

    var menu = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdmenu = await menuService.createmenu(menu)
        return res.status(201).json({status: 201, data: createdmenu, message: "Succesfully Created menu"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "menu Creation was Unsuccesfull"})
    }
}

exports.updatemenu = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var menu = {
        id,
        name: req.body.name ? req.body.name : null,
        category: req.body.category ? req.body.category : null,
        price: req.body.price ? req.body.price : null
    }

    try{
        var updatedmenu = await menuService.updatemenu(menu)
        return res.status(200).json({status: 200, data: updatedmenu, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removemenu = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await menuService.deletemenu(id)
        return res.status(204).json({status:204, message: "Succesfully menu Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.getmenu = async function(req, res, next){
    // var page = req.query.page ? req.query.page : 1
    // var limit = req.query.limit ? req.query.limit : 10; 

    var id = req.params.id;

    try{
        var menu = await menuService.getmenu(id)
        return res.status(200).json(menu)
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }
}