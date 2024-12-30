const { subject } = require('@casl/ability');
const DeliveryAddress = require('./model');
const { policyFor } = require('../../utils/getToken')

const createAddress = async (req, res, next) => {
    try {
        const payload = req.body;
        const user = req.user;
        const address = new DeliveryAddress({ ...payload, user: user._id });
        await address.save();
        res.status(201).json(address);
    } catch (err) {
        console.error("Error during address save:", err);
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



const getAddress = async (req, res, next) => {
    try {
        const addresses = await DeliveryAddress.find();
        return res.json(addresses)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                errors: err.errors
            })
        }
        next(err)
    }
};

const deleteAddress = async (req, res, next) => {
    try {
        const address = await DeliveryAddress.findByIdAndDelete(req.params.id)
        res.json(address)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                errors: err.errors
            })
        }
        next(err)
    }
};

const updateAddress = async (req, res, next) => {

    try {
        const { _id, ...payload } = req.body;
        const { id } = req.params;

        const address = await DeliveryAddress.findById(id);
        const subjectAddress = subject('DeliveryAddress', { ...address, user_id: address.user });
        const policy = policyFor(req.user)
        if (!policy.can('update', subjectAddress)) {
            return res.json({
                error: 1,
                message: 'You do not have permission to update this delivery address'
            })
        }

        address = await DeliveryAddress.findByIdAndUpdate(id, payload, { new: true })
        res.json(address)

    } catch (err) {
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                errors: err.errors
            })
        }
        next(err)
    }
}



module.exports = {
    createAddress,
    getAddress,
    deleteAddress,
    updateAddress
};