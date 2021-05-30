const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.fetchAll = async function(req, res) {

    try{
        let allUsers = await User.find({}).populate('messages');

        return res.status(200).json({
            data:{
                users: allUsers
            }
        });
    }

    catch(err){
        return res.status(404).json({
            message: "Users Not Found"
        });
    }
}

module.exports.signUp = async function(req, res) {

    //check if given username already exists
    let user = await User.findOne({email : req.body.email});

    if(!user){

        let newUser = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        });

        // console.log("User Created - ", newUser);

        // if user is created successfully go to signin page
        return res.status(200).json({
            message: "New User Created",
            newUser : newUser
        });

    }

    else{
        return res.status(409).json({
            message: "User with this email already exists"
        });
    }
}

module.exports.signIn = async function(req, res) {

    console.log("BODY",req.body);


    // when we will get email and password from user
    // we will generate the JWT 
    try{
        let user = await User.findOne({email : req.body.email});

        if(!user){
            return res.json(422, {
                message: "Not Found in database"
            });
        }

        if(user.password != req.body.password){
            return res.json(422, {
                message: "Wrong Password"
            });

        }

        return res.json(200, {
            message: "Logged in successfully",
            data: {
                id: user._id,
                email: req.body.email,
                name: user.name,
                avatar: user.avatar,
                token : jwt.sign(user.toJSON(), 'ping', {expiresIn: '1000000'})
                // this above token will be used for further queries inside the app like sending/deleting etc
            }
        });
    }

    catch(err) {
        console.log('***********error- ',err);
        return res.json(500, {
            message : "Internal Server Error"
        });
    }
}

module.exports.updateUser = async function(req, res) {

    try{
        console.log(req.body);
        // // find the user in the database
        let user = await User.findByIdAndUpdate(req.params.id, req.body);

        user.save();

        console.log("User Updated");

        return res.status(200).json({
            'message': 'User Updated',
            data: {
                updatedUser: {
                    'name': user.name,
                    'email': user.email,
                    'avatar': user.avatar
                }
            }
        });

        // User.uploadAvatar(req, res, function(err){

            // if(err) { console.log(`##########multer upload avatar ${err}`) }

            // // update the fucking user
            // user.name = req.body.name;
            // user.email = req.body.email;

            // if(req.file){
            //     user.avatar = User.avatarPath + '/' + req.file.filename;
            // }

            // user.save();

            // console.log("User Updated");

            // return res.status(200).json({
            //     'message': 'User Updated',
            //     data: {
            //         updatedUser: {
            //             'name': user.name,
            //             'email': user.email,
            //             'avatar': user.avatar
            //         }
            //     }
            // })
        // });
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            'message': 'Internal Server Error'
        });
    }
}