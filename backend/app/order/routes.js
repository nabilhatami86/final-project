const router = require('express').Router();
const { police_check } = require('../middleware/index');
const orderController = require('./controller')

router.post('/order', orderController.createOrder);
router.get('/order',
    police_check('view', 'Order'),
    orderController.getOrder
);
router.get('/order/:id',
    police_check('view', 'Order'),
    orderController.getOrderById
);


module.exports = router