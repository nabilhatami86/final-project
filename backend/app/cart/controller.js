const CartItem = require('./cart-item/model');
const Product = require('../product/model');


const getCart = async (req, res, next) => {
    try {
        let updatedCartItems = await CartItem.find({ user: req.user._id }).populate('product');
        return res.json(updatedCartItems);
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
};


const updateCart = async (req, res, next) => {
    try {
        const { product_id, plus, min } = req.body;
        const dataProduct = await Product.findOne({ _id: product_id })

        if (!dataProduct) {
            return res.status(400).json({
                error: 1,
                message: 'Product not found',
                fields: {
                    product_id: { message: 'Product not found' }
                }
            })
        }

        console.log(product_id);

        const dataCart = await CartItem.findOne({ product: product_id, user: req.user._id })
        console.log(dataCart);

        let data = {}
        if (dataCart) {
            if (plus) {
                data = await CartItem.findByIdAndUpdate(dataCart._id, { qty: plus + dataCart.qty }, { new: true })
            } else {
                if (dataCart.qty <= 1) {
                    return res.status(400).json({
                        error: 1,
                        message: 'Quantity is not enough'
                    })
                }
                data = await CartItem.findByIdAndUpdate(dataCart._id, { qty: dataCart.qty - min }, { new: true })
            }

        } else {
            data = await CartItem.create({ qty: plus, product: product_id, user: req.user._id })
        }
        return res.json(data)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
};

const deleteCart = async (req, res, next) => {
    try {
        const id = req.params.id;
        const cart = await CartItem.findByIdAndDelete(id);
        if (!cart) {
            return res.status(404).json({
                error: 1,
                message: 'Keranjang kosong atau tidak ada item untuk dihapus'
            });
        }
        return res.json({ message: 'Keranjang berhasil dihapus', cart: cart });


    } catch (err) {
        console.error(`Error deleting cart item with ID: ${req.params.id}`, err);
        if (err && err.name === 'ValidationError') {
            return res.status(400).json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err)
    }
};


module.exports = {
    updateCart,
    getCart,
    deleteCart
}