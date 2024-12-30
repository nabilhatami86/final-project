const { subject } = require('@casl/ability');
const Invoice = require('./model');
const OrderItem = require('../order/order-item/model')
const Order = require('../order/model')
const { policyFor } = require('../../utils/getToken');


const createInvoice = async (req, res, next) => {
    try {
        const { order, amount } = req.body;

        const validationOrder = await Order.findById(order)
        if (!validationOrder) {
            return res.status(404).json({ message: 'Order not found' })
        }
        if (amount !== validationOrder.total) {
            return res.status(400).json({ message: 'Amount does not match/is less than the total price' })
        }

        validationOrder.status = 'success'
        validationOrder.save()


        const invoice = new Invoice({
            amount,
            order,
            status: 'success',
            user: req.user._id
        });

        await invoice.save();

        return res.status(201).json({
            message: 'Invoice created successfully',
            data: invoice
        })
    } catch (err) {
        next(err)

    }

}


const getInvoiceByOrderId = async (req, res, next) => {
    try {
        let { order_id } = req.params;

        if (!order_id) {
            return res.json({
                err: 1,
                msg: 'Parameter order_id tidak ditemukan.',
            });
        }

        console.log("Order ID yang diterima:", order_id);

        // Mencari invoice berdasarkan orderId dan melakukan populate
        let invoice = await Invoice.findOne({ order: order_id })
            .populate({
                path: 'order',
                select: '-updatedAt -createdAt',
                populate: {
                    path: 'delivery_address',
                    model: 'DeliveryAddress',
                    select: 'kabupaten provinsi kecamatan kelurahan detail'
                }
            })
            .populate({
                path: 'user',
                select: '-password -token -updatedAt -createdAt'
            });

        if (!invoice) {
            return res.status(404).json({
                err: 1,
                msg: `Tidak ada invoice dengan order_id: ${order_id}`,
            });
        }
        const orderItems = await OrderItem.find({ order: order_id })
            .populate({
                path: 'product',
                select: 'name price'
            });

        // Memeriksa izin pengguna untuk melihat invoice ini
        let policy = policyFor(req.user);
        let subjectInvoice = subject('Invoice', { order: invoice.order, user_id: invoice.user?._id });

        if (!policy.can('read', subjectInvoice)) {
            return res.json({
                err: 1,
                msg: 'Anda tidak memiliki izin untuk melihat invoice ini.',
            });
        }

        res.status(200).json({
            invoice: invoice,
            orderItems: orderItems
        })
    } catch (err) {
        console.error("Terjadi kesalahan saat mengambil invoice:", err);
        next(err);
    }
};

const getInvoice = async (req, res, next) => {
    try {
        const invoice = await Invoice.find();
        return res.json(invoice);
    } catch (err) {
        console.error('Error Details:', err);
        return res.json({
            err: 1,
            msg: 'Error fetching invoice',
        });
    }
}

module.exports = {
    getInvoice,
    getInvoiceByOrderId,
    createInvoice
};
