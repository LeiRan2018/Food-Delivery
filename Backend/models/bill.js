var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillSchema = Schema(
    {
        // customer: {type: Schema.Types.ObjectId, ref: 'Customer', required: true},
        userId: {type: String, required: true},
        dishes: [{type: Schema.Types.ObjectId, ref: 'Dish', required: true}],
        created_at: {type: Date},
        modified_at: {type: Date}
    }
);
module.exports = mongoose.model('Bill', BillSchema);