const router = require('express').Router();
const { police_check } = require('../middleware/index')

const tagController = require('./controller');

router.get('/tag', tagController.getTag);

router.post('/tag',
    police_check('create', 'Tags'),
    tagController.createTag);

router.put('/tag/:id',
    police_check('update', 'Tags'),
    tagController.updateTag);

router.delete('/tag/:id',
    police_check('delete', 'Tags'),
    tagController.deleteTag);



module.exports = router;