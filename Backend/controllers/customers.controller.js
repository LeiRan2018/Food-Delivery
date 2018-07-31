var customerService = require('../services/customer.service');

exports.getcustomers = async function (req, res, next) {
    try {

        var customers = await customerService.getcustomers();

        return res.status(200).json({status: 200, data: customers, message: 'successfully'});

    }catch(e) {
        return res.status(400).json({status: 400, message: e.message});

    }
};

exports.getcustomer = async function(req, res, next) {
    var id = req.params.id;
    try {
        var customer = await customerService.getcustomer(id);
        return res.status(200).json({status: 200, data: customer, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.createcustomer = async function(req, res) {
    var new_customer = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address
    };
    try {
        var query = await customerService.createcustomer(new_customer);
        return res.status(200).json({status: 200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.updatecustomer = async function(req, res) {
    var id = req.params.id;

    try {
        var old_customer = await customerService.getcustomer(id);
    }catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    };

    var new_customer = {
        first_name: req.body.first_name ? req.body.first_name: old_customer.first_name,
        last_name: req.body.last_name ? req.body.last_name: old_customer.last_name,
        address: req.body.address ? req.body.address: old_customer.address
    };

    try{
        await customerService.updatecustomer(id, new_customer);
        var query = await customerService.getcustomer(id);
        return res.status(200).json({status: 200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.deletecustomer = async function(req, res) {
    var id = req.params.id;
    try {
        await customerService.deletecustomer(id);
        return res.status(200).json({status: 200, message: 'deleted customer successfully'});
    }catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}