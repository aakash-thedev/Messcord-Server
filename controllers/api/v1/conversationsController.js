const User = require('../../../models/user');

module.exports.getConversations = async function(req, res){

    try{
        // id getting from params
        const userId = req.params.id;

        // find the user id in database
        const user = await User.findById(userId).populate('conversations');

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            });
        }

        var conversationList = user.conversations;

        return res.status(200).json({
            message: 'conversation fetched',
            data: conversationList
        });
    }

    catch(err){

        console.log("Error", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}