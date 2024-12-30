const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const InvoiceSchema = new Schema({
    status: {
        type: String,
        enum: ['waiting_payment', 'success'],
        default: 'waiting_payment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    amount: {
        type: Number
    },
    total: {
        type: Number
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }
}, { timestamps: true });

module.exports = model('Invoice', InvoiceSchema);
