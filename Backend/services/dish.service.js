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
        for (var key in dishlist) {
            var dish_in_pool = await Dish.findById(key);
            if ( dishlist[key] > dish_in_pool.number) { delete dishlist[key]};
        }
        return dishlist;
    }catch(e) {
        throw Error('Error occured while checking the dish');
    }
};

exports.update_back_pool = async function(old_dishlist) {
    try {
        // put the number of old dishes back to dish pool
        for(var a in old_dishlist) {
            await Dish.findById(a, (err, data) => {
                if (err) { return 'error'}
                var num = Number(data.number);
                num += old_dishlist[a];
                data.number = num.toString();
                if(data.number > 0) {data.status = 'Available'}
                else {data.status = 'Soldout'};
                data.save();
            })
        }
    }catch(e) {
        throw Error('Error occured while putting old data back to the pool');
    }
}