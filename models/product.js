var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

// SCHEMA
var productSchema = new mongoose.Schema({
    productName: String,
    price: SchemaTypes.Double,
    category: String
});

module.exports = mongoose.model("Product", productSchema);