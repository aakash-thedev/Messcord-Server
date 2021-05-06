const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content : {
        type : String,
        required : true
    },

    // well this is a post schema so we have to connect it to the users schema
    user : {
        type : mongoose.Schema.Types.ObjectId,
        // ref here refers to which Schema you are talking about
        ref : 'User'
    },

    // it would be much better and faster if we store all the comments of posts in postSchema
    // so that whenever we fetch a post we could fetch its comments as well

    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]

}, {
    // create time stamps here
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;