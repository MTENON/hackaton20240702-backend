const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    price: Number,
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
    booked: Boolean,
})

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;