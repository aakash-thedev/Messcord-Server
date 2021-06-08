const express = require('express');
const router = express.Router();

const conversationsController = require('../../../controllers/api/v1/conversationsController');

router.get('/:id', conversationsController.getConversations);

module.exports = router;