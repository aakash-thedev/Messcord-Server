const express = require('express');
const app = express();
const port = 3000;

const cookieParser = require('cookie-parser');
app.use(express.urlencoded());
app.use(cookieParser());

const db = require('./config/mongoose');

const routers = require('./routes/index');

const passport = require('passport');
const JWTStrategy = require('./config/passport_jwt');

app.use('/', routers);

app.listen(port, function(err){

    if(err) { console.log(err); return; }

    console.log(`Ping running on port ${port}`);
});