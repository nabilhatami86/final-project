const Order = require("./model");
const OrderItem = require("./order-item/model");
const DeliveryAddress = require("../deliveryAddress/model");
const CartItem = require("../cart/cart-item/model");
const Product = require("../product/model");
const Invoice = require("../invoice/model");

const createOrder = async (req, res, next) => {
    try {
        const { delivery_address, delivery_fee, items } = req.body;

        const validationAddress = await DeliveryAddress.findOne({ _id: delivery_address })
        if (!validationAddress) {
            return res.status(400).json({ message: "Delivery address not found" });
        };

        const newOrder = await Order.create({
            delivery_address: delivery_address,
            delivery_fee: delivery_fee,
            status: 'waiting_payment',
            user: req.user._id
        });

        if (items.lenght = 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let data = 0
        let total = 0

        for (let item of items) {
            if (item.cart) {
                await CartItem.deleteOne({ _id: item.cart });
            }

            const validationProduct = await Product.findOne({ _id: item.product })
            if (!validationProduct) {
                return res.status(400).json({ message: "Product not found" });
            };

            const subtotal = item.qty * validationProduct.price
            const ongkir = newOrder.delivery_fee
            data += subtotal + ongkir

            total += data

            await OrderItem.create({
                order: newOrder._id,
                product: item.product,
                qty: item.qty,
                price: data
            })
        }

        await Order.updateOne({ _id: newOrder._id }, { total })

        const newInvoice = await Invoice.create({
            order: newOrder._id,
            status: 'waiting_payment',
            total: total,
            delivery_fee: newOrder.delivery_fee,
            user: req.user._id,
            delivery_address: newOrder.delivery_address
        })


        res.status(200).json({
            message: "Order created successfully",
            order: {
                id: newOrder._id,
                delivery_address: newOrder.delivery_address,
                delivery_fee: newOrder.delivery_fee,
                status: newOrder.status,
                total
            },
            newInvoice

        });


    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        next(err);
    }
};

const getOrder = async (req, res, next) => {
    try {
        const order = await OrderItem.find()
            .populate("product")
            .populate({
                path: "order",
                populate: {
                    path: "delivery_address",
                },
                populate: {
                    path: "user",
                    select: "-password -token"
                }
            })
        return res.json(order)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        next(err);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id)
        const order = await OrderItem.findById(id).populate("product")
            .populate({
                path: "order",
                populate: {
                    path: "delivery_address",
                },
                populate: {
                    path: "user",
                    select: "-password -token"
                }
            })
        res.status(201).json({
            message: "Order retrieved successfully",
            order: order
        })
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        next(err);
    }
}

module.exports = {
    createOrder,
    getOrder,
    getOrderById
};