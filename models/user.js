const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    avatar : {
        type : String
    },

    bio : {
        type : String
    },

    password : {
        type : String,
        required : true,
    }

},{
    timeStamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;