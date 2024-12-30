const router = require('express').Router();
const { police_check } = require('../middleware/index');
const cartController = require('./controller')

router.put('/carts',

    cartController.updateCart
);

router.get('/carts',
    police_check('read', 'Cart'),
    cartController.getCart
);

router.delete('/carts/:id', cartController.deleteCart);


module.exports = router