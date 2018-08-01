var billService = require('../services/bill.service');
var dishService = require ('../services/dish.service');

exports.getbills = async function(req, res) {
    try {
        var query = await billService.getbills();
        return res.status(200).json({status:200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message:'error occured while fetching bill list'});
    }
};

exports.getbill = async function(req, res) {
    var id = req.params.id;
    try {
        var query = await billService.get(id);
        return res.status(200).json({status:200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message:'error occured while fetching bill'});
    }
};

exports.createbill = async function(req, res) {
    // splite the dish string to a array
    var disharray = req.body.dishes.split(',');

    // sort dish array to a list show their type and number 
    var dishlist = [];
    for (i=0; i<disharray.length;) {
        var data = disharray.filter(s => s == disharray[i]);
        var dish = data[0];
        var num = data.length;
        dishlist.push({key: dish, num: num});
        i += num;
    }
    // check and update dish list with database, return unavailable dish with false value
    try {
        var dishstatus = await dishService.checkpool(dishlist);
    }catch(e) {
        return res.status(400).json({status:400, message:'error occured while creating updating dishes'});
    }
    // filter and remove unavailable dish in dishstatus
    do {
        var pos = dishstatus.map(d => d.num).indexOf('false')
        if (pos>-1){dishstatus.splice(pos, 1)}
      } while (pos > -1)
    // change the dish order list back to an array
    var dish_available = [];
    dishstatus.forEach(function (a) {
        for (i=0; i<a['num']; i++){
            dish_available.push(a['key'])
        };
    });
    var new_data = {
        customer: req.body.customer ? req.body.customer: null,
        date: Date.now(),
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
        return res.status(400).json({status:400, message:'error occured while creating bill'});
    }
};

exports.updatebill = async function(req, res) {
    var id = req.params.id;
    try {
        var old_data = await billService.get(id);
    }catch(e) {
        return res.status(400).json({status:400, message:'error occured while fetching bill'});
    }
    var disharray = req.body.dish.split(',');
    var new_data = {
        customer: req.body.customer ? req.body.customer: old_data.customer,
        dishes: disharray ? disharray: old_data.dish
    }
    try {
        await billService.update(id, new_data);
        var query = await billService.get(id);
        return res.status(200).json({status:200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message:'error occured while updating bill'});
    }
};

exports.deletebill = async function(req, res) {
    var id = req.params.id;
    try {
        await billService.delete(id);
        var query = await billService.getbills();
        return res.status(200).json({status:200, data: query, message: 'deleted successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message:'error occured while deleting bill'});
    }
}