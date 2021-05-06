const express = require('express');
// create router
const router = express.Router();
const passport = require('passport');

const userController = require('../controller/user_controller');

// only visit profile when user is logged in already for that we will use middleware
router.get('/profile/:id', passport.checkAuthentication , userController.profile);

// create user
router.post('/create', userController.create);

// update user
router.post('/update/:id', passport.checkAuthentication, userController.updateUser);

// create session
router.post('/create-session', passport.authenticate('local', {failureRedirect : '/sign-in'}), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;