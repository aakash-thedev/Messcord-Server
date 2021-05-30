const Message = require('../models/message');

// we will create socket which will recieve a chatServer

// now this is basically our OBSERVER which will manage any new connections

module.exports.chatSockets = function(socketServer) {

    let io = require('socket.io')(socketServer);

    io.sockets.on('connection', function(socket){

        console.log('New Socket Connection Established', socket.id);

        socket.on('join_request', function(data) {
            // data : { from: ___, to: ____}

            const rooms = [data.from, data.to];

            rooms.forEach(room => socket.join(room));
            // socket.join(data.to);

            console.log(`${data.from} has requested to join with ${data.to}`);

            // inside that chatroom emit a message of user_joined
            io.to(data.from).to(data.to).emit('user_joined', data);

        });

        socket.on('send_message', function(data){

            // console.log(`${data.user_email}- ${data.message}`);
            io.to(data.to).emit('receive_message', data);
        });

        // when any socket will get disconnected

        socket.on('disconnect', function(){
            console.log("Socket Disconnected");
        });

    });
}