const router = require('express').Router();
const multer = require('multer')
const os = require('os');
const { police_check } = require('../middleware/index')

const productController = require('./controller')

router.get('/products', productController.getProduct);
router.post('/products', multer({ dest: os.tmpdir() }).single('image'), police_check('create', 'Product'), productController.createProduct);
router.put('/products/:id', multer({ dest: os.tmpdir() }).single('image'), police_check('update', 'Product'), productController.updateProduct);
router.delete('/products/:id', police_check('delete', 'Product'), productController.deleteProduct);

module.exports = router;