const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/message', require('./message'));
router.use('/conversations', require('./conversations'));

module.exports = router;