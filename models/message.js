const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({

    message : {
        type : String,
        required : true
    },

    media : {
        type : String
    },

    seen: {
        type: Boolean
    }

},{
    timeStamps: true
});

const Message = mongoose.model('User', messageSchema);

module.exports = Message;