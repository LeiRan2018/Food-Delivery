var genreService = require('../services/genre.service');

exports.getgenres = async function(req, res, next) {
    try {
        var query = await genreService.getgenres();
        return res.status(200).json({status:200, data: query, message:'successfully'})

    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    };
};

exports.getgenre = async function(req, res, next) {
    var id = req.params.id;
    try {
        var query = await genreService.getgenre(id);
        return res.status(200).json({status:200, data: query, message: 'successfully'});
    }catch(e) {
        return res.status(400).json({status:400, message: e.message});
    }
};

exports.creategenre = async function(req, res, next) {
    var genre = {
        name: req.body.name,
        created_at: Date.now(),
    }
    try {
        var query = await genreService.postgenre(genre);
        return res.status(200).json({status: 200, data: query, messages: 'Successfully'})

    }catch(e){
        return res.status(404).json({status: 404, message: e.message});
    }
};

exports.updategenre = async function(req, res, next) {
    var id = req.params.id;

    try {
        var old_genre = await genreService.getgenre(id);
    }catch(e) {
        return res.status(404).json({status: 404, message: e.message});
    };

    var new_data = {
        name: req.body.name ? req.body.name : old_genre.name,
        modified_at: Date.now()
    };

    try {
        await genreService.updategenre(id, new_data);
        var new_genre = await genreService.getgenre(id);
        return res.status(200).json({status: 200, data: new_genre, messages: 'Successfully'})
    }catch(e) {
        return res.status(404).json({status: 404, message: e.message});
    };
};

exports.deletegenre = async function(req, res) {
    var id = req.params.id;
    try {
        await genreService.deletegenre(id);
        var query = await genreService.getgenres();
        return res.status(200).json({ status: 200, data: query, messages: 'delete genre successfully' });
    }catch(e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}