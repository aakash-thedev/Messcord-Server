const express = require('express');
const router = express.Router();
const passport = require('passport');
// const multer = require('multer');

const userController_api = require('../../../controllers/api/v1/userController_api');

router.get('/all', userController_api.fetchAll);
router.post('/sign-up', userController_api.signUp);
router.post('/sign-in', userController_api.signIn);

// const uploadAvatar = multer();
router.post('/update/:id', userController_api.updateUser);

module.exports = router;