var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
    {
        name: {type: String, required: true, min:3, max:100},
        created_at: {type: Date},
        modified_at: {type: Date}
    }
);

GenreSchema
.virtual('url')
.get(function(){
    return this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);