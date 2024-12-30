const Courier = require('./model');

const createCourier = async (req, res, next) => {
    try {
        const { name, delivery_fee } = req.body;
        console.log('Request Body:', req.body);
        const newCourier = await Courier.create({
            name,
            delivery_fee
        });

        console.log(newCourier)
        return res.status(201).json({
            message: 'Courier created successfully',
            courier: newCourier
        });

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

const show = async (req, res, next) => {
    try {
        const couriers = await Courier.find();
        console.log('Fetched Couriers:', couriers); // Log data hasil pencarian
        res.status(200).json(couriers);
    } catch (err) {
        console.error('Error fetching couriers:', err.message); // Log error jika ada
        next(err);
    }
}

module.exports = {
    createCourier,
    show
}