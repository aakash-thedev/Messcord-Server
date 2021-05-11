const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.signUp = async function(req, res) {

    // console.log("USER - ", req.body);

    // if(req.body.password !== req.body.password2){
    //     return res.redirect('back');
    // }

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

    // when we will get email and password from user
    // we will generate the JWT 
    try{
        let user = await User.findOne({email : req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid Username/Password"
            });
        }

        return res.json(200, {
            message: "Logged in successfully | Here's your token",
            data: {
                token : jwt.sign(user.toJSON(), 'ping', {expiresIn: '1000000'})
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