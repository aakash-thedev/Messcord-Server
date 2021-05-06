//--------------- This Route is controlling all the other routes in the folder ------------------- //

const express = require('express');
const passport = require('passport');

const router = express.Router();
const homeController = require('../controller/home_controller');
const userController = require('../controller/user_controller');

console.log('router loaded');

router.get('/', homeController.home);

router.get('/logo-action', userController.logoAction);

router.get('/sign-in', userController.signin);
router.get('/sign-up', userController.signup);

// -------------- After logging in ------------------ //
router.get('/home', userController.home);

// ----------------- controlling other routes --------- //
router.use('/user', require('./user'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));


// export the routers to server
module.exports = router;