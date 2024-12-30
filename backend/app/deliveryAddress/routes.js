const router = require('express').Router();
const deliveryAddressController = require('./controller');
const { police_check } = require('../middleware/index')


router.post('/deliveryaddresses',
    police_check('create', 'DeliveryAddress'),
    deliveryAddressController.createAddress
);

router.get('/deliveryaddresses',
    police_check('View', 'DeliveryAddress'),
    deliveryAddressController.getAddress);

router.put('/deliveryaddresses/:id',
    police_check('update', 'DeliveryAddress'),
    deliveryAddressController.updateAddress
);

router.delete('/deliveryaddresses/:id',
    police_check('delete', 'DeliveryAddress'),
    deliveryAddressController.deleteAddress
)



module.exports = router;