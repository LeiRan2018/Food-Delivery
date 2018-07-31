var Bill = require('../models/bill');

exports.getbills = async function () {
    try {
        var query = await Bill.find()
        .populate('customer')
        .populate('dishes');
        return query;
    }catch(e) {
        throw Error('error occured while fetching bills');
    }       
};

exports.get = async function(id) {
    try {
        var query = await Bill.findById(id);
        return query;
    }catch(e) {
        throw Error('error occured while finding bill');
    }
};

exports.create = async function(data) {
    var new_bill = new Bill(data);
    try {
        var query = await new_bill.save();
        return query;
    }catch(e) {
        throw Error('error occured while creating bill');
    }
};

exports.update = async function(id, data) {
    try {
        await Bill.findByIdAndUpdate(id, data);
    }catch(e) {
        throw Error('error occured while updating bill');
    }
};

exports.delete = async function(id) {
    try {
        await Bill.findByIdAndRemove(id);
    }catch(e) {
        throw Error('error occured while deleting bill');
    }
};