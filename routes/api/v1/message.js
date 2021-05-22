const express = require('express');
const router = express.Router();

const messageController_api = require('../../../controllers/api/v1/messageController_api');

router.post('/create/:id', messageController_api.create);
router.get('/getMessages/', messageController_api.getMessages);

module.exports = router;