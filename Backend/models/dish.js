var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var DishSchema = Schema(
  {
    name: {type: String, required: true},
    price: {type: String, required: true},
    status: {type: String, enum: ['Available', 'Soldout'], default: 'Available'},
    number: {type: String, default:'1'},
    created_at: {type: Date},
    modified_at: {type: Date},
    genre: {type: Schema.Types.ObjectId, ref: 'Genre'}
  }
);

//Export model
DishSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Dish', DishSchema);