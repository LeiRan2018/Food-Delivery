var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        address: {type: String, required: true, max: 200},
        created_at: {type: Date},
        modified_at: {type: Date}
    }
);
// Export model
module.exports = mongoose.model('Customer', CustomerSchema);