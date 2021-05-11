const express = require('express');
const router = express.Router();

const messageController_api = require('../../../controllers/api/v1/messageController_api');

router.use('/sync', messageController_api.sync);

module.exports = router;