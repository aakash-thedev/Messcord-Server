const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    message: {
        type: String
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;