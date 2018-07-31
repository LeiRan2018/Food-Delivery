var dishinstanceService = require('../services/dishinstance.service')

exports.getdishinstances = async function(req, res, next) {
    try {
        var dishinstance = await dishinstanceService.getdishinstances();
        var num = dishinstance.length;
        return res.status(200).json({status:200, data: dishinstance, count: num, message:'successfully'})

    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    };
};

exports.getdishinstance = async function(req, res, next) {
    var id = req.params.id;
    try {
        var query = await dishinstanceService.get(id);
        return res.status(200).json({status:200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.createdishinstance = async function(req, res, next) {
    var dishinstance = {
        dish: req.body.dish,
        customer: req.body.customer ? req.body.customer : null
    }
    try {
        var query = await dishinstanceService.post(dishinstance);
        var num = query.length;
        return res.status(200).json({status: 200, data: query, count: num, messages: 'Successfully'})

    }catch(e){
        return res.status(404).json({status: 404, message: e.message});
    }
};

exports.updatedishinstance = async function(req, res, next) {
    var id = req.params.id;

    try {
        var old_dish = await dishinstanceService.get(id);
    }catch(e) {
        return res.status(404).json({status: 404, message: e.message});
    };

    var new_data = {
        dish: req.body.dish ? req.body.dish : old_dish.dish,
        customer: req.body.customer ? req.body.customer: old_dish.customer
    };

    try {
        await dishinstanceService.update(id, new_data);
        var new_dish = await dishinstanceService.get(id);
        return res.status(200).json({status: 200, data: new_dish, messages: 'Successfully'})
    }catch(e) {
        return res.status(404).json({status: 404, message: e.message});
    };
};

exports.deletedishinstance = async function(req, res) {
    var id = req.params.id;
    try {
        await dishinstanceService.delete(id);
        var dishinstances = await dishinstanceService.getdishinstances();
        var num = dishinstances.length;
        return res.status(200).json({ status: 200, data: dishinstances, count: num, message: 'Successfullly' });
    }catch(e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
