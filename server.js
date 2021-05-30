const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const port = 8000;

const cookieParser = require('cookie-parser');
app.use(express.urlencoded());
app.use(cookieParser());

const db = require('./config/mongoose');

const passport = require('passport');
const JWTStategy = require('./config/passport_jwt');

// ------------------------------ creating a chat server to connet with socket.io --------------------------- //

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chats_sockets').chatSockets(chatServer);
chatServer.listen(8080);

console.log(`Chat Server Listening on port 8080`);

// ------------------------------------------------------------------------------------------------------------//

const routers = require('./routes/index');
app.use('/', routers);

app.listen(port, function(err){

    if(err) { console.log(err); return; }

    console.log(`Messcord Server Running on port ${port}`);
});