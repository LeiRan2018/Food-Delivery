var Dishinstance = require('../models/dishinstance');

exports.getdishinstances = async function() {
    try {
        var query = await Dishinstance.find();
        return query;
    }catch(e) {
        throw Error('error occured while fetching dish instances');
    }
};

exports.get = async function(id) {
    try {
        var query = await Dishinstance.findById(id);
        return query;
    }catch(e) {
        throw Error('error occured while fetching dish instance');
    }
};

exports.post = async function (data) {
    var newDishinstance = Dishinstance(data)
    try {
        var query = await newDishinstance.save();
        return query;
    }catch(e) {
        throw Error('Error occured while creating the dishinstance');
    }
};

exports.update = async function(id, new_data) {
    try {
        await Dishinstance.findByIdAndUpdate(id, new_data);
    }catch(e) {
        throw Error('Error occured while updating the dishinstance');
    }
};

exports.delete = async function(id) {
    try {
        await Dishinstance.findByIdAndRemove(id);
    }catch(e) {
        throw Error('Error occured while deleting the dishinstance');
    }
};

exports.getdish = async function(id) {
    try {
        var query = await Dishinstance.find( {dish: id} );
        return query;
    }catch(e) {
        throw Error('Error occured while finding the dish type');
    }
};

