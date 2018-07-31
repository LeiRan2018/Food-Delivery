// Gettign the Newly created Mongoose Model we just created 
var Menu = require('../models/menu.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the To do List
exports.getmenus = async function(query, page, limit){

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var menus = await Menu.paginate(query, options)
        return menus;

    } catch (e) {
        throw Error('Error while Paginating menus')
    }
}

exports.getmenu = async function(id){
    // var options = {
    //     page,
    //     limit
    // }

    try{
        //Find the old menu Object by the Id
    
        var query = await Menu.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the menu")
    }
    try {
        // var menu = await Menu.paginate(query, options)
        return query;

    } catch (e) {
        throw Error('Error while Paginating menus')
    }
}


exports.createmenu = async function(menu){
    
    // Creating a new Mongoose Object by using the new keyword
    var newmenu = new Menu({
        name: menu.name,
        category: menu.category,
        date: new Date(),
        price: menu.price
    })

    try{

        // Saving the menu 
        var savedmenu = await newmenu.save()

        return savedmenu;
    }catch(e){
      
        // return a Error message describing the reason     
        throw Error("Error while Creating menu")
    }
}

exports.updatemenu = async function(menu){
    var id = menu.id

    try{
        //Find the old menu Object by the Id
    
        var oldmenu = await Menu.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the menu")
    }

    // If no old menu Object exists return false
    if(!oldmenu){
        return false;
    }

    console.log(oldmenu)

    //Edit the menu Object
    oldmenu.name = menu.name
    oldmenu.category = menu.category
    oldmenu.price = menu.price


    console.log(oldmenu)

    try{
        var savedmenu = await oldmenu.save()
        return savedmenu;
    }catch(e){
        throw Error("And Error occured while updating the menu");
    }
}

exports.deletemenu = async function(id){
    
    // Delete the menu
    try{
        var deleted = await Menu.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("menu Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the menu")
    }
}