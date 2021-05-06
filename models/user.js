// user schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    dob : {
        type : String,
        required : true
    },

    gender : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true,
    }

}, {
    timestamps : true
});

const User = mongoose.model("User", userSchema);

module.exports = User;