var Customer = require('../models/customer');


exports.getcustomers = async function () {
    try {
        var query = await Customer.find().sort([['name', 'ascending']]);
        return query;
    }catch(e) {
        throw Error('Error occured while finding the customers');
    }
};

exports.getcustomer = async function(id) {
    try {
        var query =await Customer.findById(id);
        return query;
    }catch(e) {
        throw Error('Error occured while finding the customer');
    }
};

exports.createcustomer = async function(data) {
    var new_customer = Customer(data);
    try {
        var query = await new_customer.save();
        return query;
    }catch(e) {
        throw Error('Error occured while creating the customer');
    }
};

exports.updatecustomer = async function(id, data) {
    try {
        await Customer.findByIdAndUpdate(id, data);
    }catch(e) {
        throw Error('Error occured while updating the customer');
    }
};

exports.deletecustomer = async function(id) {
    try {
        await Customer.findByIdAndRemove(id);
    }catch(e) {
        throw Error('Error occured while deleting the customer');
    }
};