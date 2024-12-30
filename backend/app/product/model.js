const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const productSchema = Schema({

    name: {
        type: String,
        minLength: [3, 'panjang nama makanan minimal 3 karakter'],
        required: [true, 'harus diiisi']
    },
    description: {
        type: String,
        maxLength: [1000, 'panjang deskripsi maksimal 1000 karakter']
    },
    price: {
        type: Number,
        default: 0,
        min: [0, 'Harga tidak boleh negatif']
    },
    image_url: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tags',
    }],

}, { timestamps: true });

module.exports = model('Product', productSchema)
