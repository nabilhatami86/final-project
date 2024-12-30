const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const OredrItemSchema = ({
    price: {
        type: Number,
        default: 0
    },

    qty: {
        type: Number,
        require: [true, 'qty harus diisi'],
        min: [1, 'qty minimal 1']
    },


    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }

});

module.exports = model('OrderItem', OredrItemSchema)