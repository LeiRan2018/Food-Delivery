var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DishInstanceSchema = Schema (
    {
        dish: {type: Schema.Types.ObjectId, ref: 'Dish', required: true},
        customer: {type: Schema.Types.ObjectId, ref: 'Customer'}
    }
);

DishInstanceSchema
.virtual('url')
.get( function () {
    return this._id;
});

module.exports = mongoose.model('DishInstance', DishInstanceSchema);