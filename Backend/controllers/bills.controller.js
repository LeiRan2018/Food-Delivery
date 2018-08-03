var billService = require('../services/bill.service');
var dishService = require ('../services/dish.service');

exports.getbills = async function(req, res) {
    try {
        var query = await billService.getbills();
        return res.status(200).json({status:200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.getbill = async function(req, res) {
    var id = req.params.id;
    try {
        var query = await billService.get(id);
        return res.status(200).json({status:200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.createbill = async function(req, res) {
    // splite the dish string to a array
    var disharray = req.body.dishes.split(',');

    // sort dish array to a list show their type and number 
    var dishlist = disharray.reduce((alldata, data) =>{
        if(data in alldata) {alldata[data]++;}
        else {alldata[data] = 1};
        return alldata;
    },[]);

    // check and update dish list with database, return dish without unavailable dish
    try {
        var dishstatus = await dishService.checkpool(dishlist);
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }

    // change the dish order list back to an array
    var dish_available = [];
    for (var dish in dishstatus) {
        for(i=0; i<dishstatus[dish]; i++) { dish_available.push(dish)}
    }
    var new_data = {
        customer: req.body.customer ? req.body.customer: null,
        created_at: Date.now(),
        dishes: (dish_available.length >0) ? dish_available: false
    }
    try {
        var dishupdated = await dishService.updatepool(dish_available);
        var query = await billService.create(new_data);
        var dish_ordered = [];
        dishupdated.forEach( function (a) {
            dish_ordered.push( a['name'] + ': ' + a['status'])
        });
        return res.status(200).json({status:200, data: query, dish_ordered: dish_ordered, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.updatebill = async function(req, res) {
    var id = req.params.id;
    try {
        var old_data = await billService.get(id);
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
    var disharray = req.body.dishes.split(',');
    // sort array 
    var new_dishlist = disharray.reduce((alldata, data) =>{
        if(data in alldata) {alldata[data]++;}
        else {alldata[data] = 1};
        return alldata;
    },[]);
    var old_dishlist = old_data.dishes.reduce((alldata, data) =>{
        if(data in alldata) {alldata[data]++;}
        else {alldata[data] = 1};
        return alldata;
    },[]);
    // put old dishes data back to dish pool
    try {
        await dishService.update_back_pool(old_dishlist);
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
    // check new data availibility
    try {
        var dishstatus = await dishService.checkpool(new_dishlist);
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
    // sort all available data to an array
    var dish_available = [];
    for (var dish in dishstatus) {
        for(i=0; i<dishstatus[dish]; i++) { dish_available.push(dish)}
    }

    var new_data = {
        customer: req.body.customer ? req.body.customer: old_data.customer,
        dishes: (dish_available.length >0) ? dish_available: false,
        modified_at: Date.now()
    }
    try {
        var dishupdated = await dishService.updatepool(dish_available);
        await billService.update(id, new_data);
        var query = await billService.get(id);
        var dish_ordered = [];
        dishupdated.forEach( function (a) {
            dish_ordered.push( a['name'] + ': ' + a['status'])
        });
        return res.status(200).json({status:200, data: query, update_dishes: dish_ordered, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.deletebill = async function(req, res) {
    var id = req.params.id;
    try {
        await billService.delete(id);
        var query = await billService.getbills();
        return res.status(200).json({status:200, data: query, message: 'deleted successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
}