const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
