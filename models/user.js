const mongoose = require('mongoose');

// set up multer for user profile photo / cover photo and etc
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },

    lastMessage: {
        type: String
    }

},{
    timeStamps: true
});

// ------------------ define destination and filename in multer's storage key ------------------- //

var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        // this is basically a cb (callback function where we need to tell exact path where we need to store our files path from user.js to avatars)
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },

    filename: function (req, file, cb) {
        // fieldname is avatar in userschema
        cb(null, file.fieldname + '-' + Date.now())
    }
});

// ------------------------------------ Static Methods ------------------------------- so that it can be avaible throughout the class //

// above we set up the diskStorage in variable storage and now here we are assigning that variable's value to multer's storage
// -----------------------------------------------------------single is telling to upload one file at a time
// basically these functions and variables are stored inside usersSchema as static
// we can use them anywhere just by User.uploadAvatar & so on

userSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;