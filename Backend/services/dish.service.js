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

        // transfer object to Map object
        // var new_map = new Map(Object.entries(new_dishlist));
        // var old_map = new Map(Object.entries(old_dishlist));
        // var indicator = true;
        // compare two Map objects and assign the big Map object with large size
        // if (new_map.size >= old_map.size) {var big_map = new_map; var small_map = old_map;}
        // else {var big_map = old_map; var small_map = new_map; indicator = false};
        // create a new map which contains the difference between these two map objects
        // var change_map = new Map();
        // small_map.forEach((value, key, array) => {
    
        //     big_map.forEach((value1, key1, array1) =>{
        //         if (array.has(key1)) {change_map.set(key1, ( value1 - array.get(key1)))}
        //         else if (array1.has(key) == false) {change_map.set(key, -value);}
        //         else {change_map.set(key1, value1 );}
        //     })
        // })
        // if new list is bigger than old one reverts this change_map
        // if (indicator) {change_map.forEach((value,key) => {change_map.set(key, -value)})}
        // transfer to an array since await cannot be used in callback function !!! otherwise it would be so easy
        // var change_obj =[];
        // change_map.forEach((value, key) => {change_obj.push({'key': key, 'num': value})});
        // for(i=0; i<change_obj.length; i++){
        //     await Dish.findById(change_obj[i].key, (err, data) => {
        //         if (err) { return 'error'};
        //         var num = Number(data.number);
        //         num += change_obj[i].num;
        //         data.number = num.toString();
        //         if(data.number > 0) {data.status = 'Available'}
        //         else {data.status = 'Soldout'};
        //         data.save();
        //     });
        // }
        
    }catch(e) {
        throw Error('Error occured while putting old data back to the pool');
    }
}