const express = require('express');
const port = process.env.PORT || 8005;
// create an express app
const app = express();
// cookieParser is used to access to and modify cookies in browser
const cookieParser = require('cookie-parser');
// expressLayouts are from layout in front end
const expressLayouts = require('express-ejs-layouts');
// import database
const db = require('./config/mongoose');

// these three are used for our session cookie and will use the session middleware after views declaration down
const session = require('express-session');
const passport = require('passport');
const PassportLocalStrategy = require('./config/passport-local-strategy');

// import MongoStore to solve the user logged out after every server restart problem
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

// we will use flash after the session is created for the user to display sign-in message
const flash = require('connect-flash');
const customMiddleware = require('./config/customMiddleware');

app.use(sassMiddleware({

    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    // prefix means inside which folder should server look for css files
    prefix : '/assets/css'

}));

app.use(express.urlencoded());
app.use(cookieParser());

app.use('*/assets', express.static('./assets'));

// to use layouts
app.use(expressLayouts);

// layouts ki styling ke alawa agar individual pages ki styling krni ho
// tb style aur script tags ko unki respective sahi positions me hi rkhne ke liye
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// import routers
const routers = require('./routes/index');

// session middleware
// also mongoStore is used to store the session cookie in the db
app.use(session({
    // name is name of cookie
    name : 'codeconnect',
    // this secret field is the encrypted text which we will generate later during production / deployment
    secret : 'th980kl91278jkloip@kloaakash123%22',
    saveUninitialized : false,
    resave : false,
    cookie : {
        // maxAge is in milliseconds
        maxAge : (1000 * 60 * 100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    }, function(err) { console.log(err || 'connect-mongodb setup ok') } )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// after session created
app.use(flash());
app.use(customMiddleware.setFlash);

// accessing any router as per requests in routes folder
app.use('/', routers);

// fire up the server on the port
app.listen(port, (err)   => {

        if(err){
            console.log(`Error : ${error}` );
            return;
        }

        console.log(`codemate running on : ${port}`);;
        return;
    }
);