const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Definisikan schema untuk courier
const courierSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Courier name is required'],
            unique: true,
        },
        delivery_fee: {
            type: Number,
            required: [true, 'Delivery fee is required'],
            min: [0, 'Delivery fee must be a positive number'],
        },
    },
    { timestamps: true });
module.exports = model('Courier', courierSchema);
