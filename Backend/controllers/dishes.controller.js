var dishService = require('../services/dish.service');
var genreService = require('../services/genre.service');


exports.getdishes = async function (req, res, next) {
    try {
        var dishes = await dishService.getdishes();
        return res.status(200).json({ status: 200, data: dishes, messages: 'Successfully' });
    } catch (e) {

        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getdish = async function (req, res, next) {

    var id = req.params.id;
    try {
        var dish = await dishService.getdish(id);
        return res.status(200).json({ status: 200, data: dish, messages: 'Successfully' });

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.createdish_get = async function (req, res, next) {
    try {
        var query = await genreService.getgenres();
        return res.status(200).json({ status: 200, data: query, messages: 'Successfully' })
    } catch (e) {
        return res.status(404).json({ status: 404, message: e.message });
    }
};

exports.createdish_post = async function(req, res, next) {
    var dish = {
        name: req.body.name,
        price: req.body.price,
        created_at: Date.now(),
        number: req.body.number,
        genre: req.body.genre
    }
    try {
        var query = await dishService.postdish(dish);
        return res.status(200).json({status: 200, data: query, messages: 'Successfully'})

    }catch(e){
        return res.status(404).json({status: 404, message: e.message});
    }
};

exports.updatedish = async function(req, res, next) {
    var id = req.params.id;

    try {
        var old_dish = await dishService.getdish(id);
    }catch(e) {
        return res.status(404).json({status: 404, message: e.message});
    };
    
    var new_data = {
        name: req.body.name ? req.body.name : old_dish.name,
        price: req.body.price ? req.body.price: old_dish.price,
        status: (req.body.number > 0) ? 'Available': 'Soldout',
        number: req.body.number ? req.body.number: old_dish.number,
        genre: req.body.genre ? req.body.genre: old_dish.genre,
        modified_at: Date.now()
    };

    try {
        await dishService.updatedish(id, new_data);
        var new_dish = await dishService.getdish(id);
        return res.status(200).json({status: 200, data: new_dish, messages: 'Successfully'})
    }catch(e) {
        return res.status(404).json({status: 404, message: e.message});
    };
};

exports.deletedish = async function(req, res) {
    var id = req.params.id;
    try {
        await dishService.deletedish(id);
        var query = await dishService.getdishes();
        return res.status(200).json({ status: 200, data: query, messages: 'delete dish successfully' });
    }catch(e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}