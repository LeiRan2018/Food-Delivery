var Genre = require('../models/genre');

_this = this

exports.getgenres = async function() {
    try {
        var query = await Genre.find();
        return query;
    }catch(e) {
        throw Error('Error occured while finding the genres');
    }
};

exports.getgenre = async function (id) {
    try {
        var query = await Genre.findById(id);
        return query;
    }catch(e) {
        throw Error('Error occured while finding the genre');
    }
};

exports.postgenre = async function (genre) {
    var newgenre =new Genre(genre);
    try {
        var query = await newgenre.save();
        return query;
    }catch(e) {
        throw Error('Error occured while creating the genre');
    }
};

exports.updategenre = async function(id, new_data) {
    try {
        await Genre.findByIdAndUpdate(id, new_data);
    }catch(e) {
        throw Error('Error occured while updating the genre');
    }
};

exports.deletegenre = async function(id) {
    try {
        await Genre.findByIdAndRemove(id);
    }catch(e) {
        throw Error('Error occured while deleting the genre');
    }
}