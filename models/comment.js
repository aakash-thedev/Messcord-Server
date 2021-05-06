const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    comment : {
        type : String,
        required : true
    },

    // kis user ne comment kiya !!

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    // kis post pe comment kiya !!

    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }

}, {
    timestamps : true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;