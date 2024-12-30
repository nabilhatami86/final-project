const mongoose = require('mongoose');
const { model, Schema } = mongoose;


const orderSchema = new Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'success'],
        default: 'waiting_payment'
    },

    delivery_fee: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },

    delivery_address: {
        type: Schema.Types.ObjectId,
        ref: 'DeliveryAddress',
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

module.exports = model('Order', orderSchema);
