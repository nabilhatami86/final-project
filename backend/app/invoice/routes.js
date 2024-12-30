const router = require('express').Router();
const invoiceController = require('./controller');

router.post('/invoices', invoiceController.createInvoice)
router.get('/invoices/:order_id', invoiceController.getInvoiceByOrderId);
router.get('/invoices', invoiceController.getInvoice);

module.exports = router;
