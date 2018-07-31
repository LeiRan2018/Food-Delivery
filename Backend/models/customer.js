var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        address: {type: String, required: true, max: 200},
    }
);

// Virtual for customer's full name
CustomerSchema
.virtual('name')
.get( function () {
    return this.last_name + ', ' + this.first_name;
});

// Virtual for customer's URL
CustomerSchema
.virtual('url')
.get( function () {
    return this._id;
});

// Export model
module.exports = mongoose.model('Customer', CustomerSchema);