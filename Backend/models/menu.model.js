var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var MenuSchema = new mongoose.Schema(
    {
    name: String,
    category: String,
    date: Date,
    price: Number
}
);

MenuSchema.plugin(mongoosePaginate)
const Menu = mongoose.model('Menu', MenuSchema)

module.exports = Menu;