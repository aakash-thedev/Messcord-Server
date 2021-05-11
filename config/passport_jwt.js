const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ping"
}

passport.use(new JWTStrategy(options, function(jwtPayload, done) {
    // jwtPayLoad is containing user infomation in encrypted form
    // we will find that user in database
    User.findById(jwtPayload._id, function(err, user) {

        if(err) { console.log(`Error finding user from JWT - ${err}`); return; }

        if(user){
            return done(null, user);
        }

        else{
            return done(null, false);
        }
    });
}));

module.exports = passport;