var Dish = require('../models/dish');

_this = this

exports.getdishes = async function() {
    try {
        var query = await Dish.find().sort([['name', 'ascending']])
        .populate('genre')
        return query;
    }catch(e) {
        throw Error('Error occured while finding the dishes');
    }
};

exports.getdish = async function (id) {
    try {
        var query = await Dish.findById(id);
        return query;
    }catch(e) {
        throw Error('Error occured while finding the dish');
    }
};

exports.postdish = async function (dish) {
    var newDish = Dish(dish)
    try {
        var query = await newDish.save();
        return query;
    }catch(e) {
        throw Error('Error occured while creating the dish');
    }
};

exports.updatedish = async function(id, new_data) {
    try {
        await Dish.findByIdAndUpdate(id, new_data);
    }catch(e) {
        throw Error('Error occured while updating the dish');
    }
};

exports.deletedish = async function(id) {
    try {
        await Dish.findByIdAndRemove(id);
    }catch(e) {
        throw Error('Error occured while deleting the dish');
    }
};

exports.updatepool = async function(disharray) {
    try {
        var statuslist = [];
        for (i = 0; i< disharray.length; i++) {
            var status = await Dish.findById(disharray[i], function(err, data) {
                if (err) {return 'error'};
                if (data.number > 0 ) {
                    data.number -= 1;
                    data.save();
                }
                if (data.number == 0 ) {
                    data.status = 'Soldout';
                    data.save();
                }
            });
            statuslist.push(status);
        }
        return statuslist;
    }catch(e) {
        throw Error('Error occured while updating the dish pool');
    }
};

exports.checkpool = async function(dishlist) {
    try {
        for (i=0; i< dishlist.length; i++){
            var dish_id = dishlist[i]['key'];
            var dish_num = dishlist[i]['num'];
            var dish_in_pool = await Dish.findById(dish_id);
            if (dish_num > dish_in_pool.number) {
                dishlist[i]['num'] = 'false'
            }
        }
        return dishlist;

    }catch(e) {
        throw Error('Error occured while checking the dish');
    }
}