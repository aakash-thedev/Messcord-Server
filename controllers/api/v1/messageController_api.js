const Message = require('../../../models/message');
const User = require('../../../models/user');

// ---------------------- create a function to get messages of selected ID --------------------- //

module.exports.getMessages = async function(req, res) {

    // sender and reciever will be fetched from request params
    const recieversID = req.query.recieversID;
    const sendersID = req.query.sendersID;
    const sendersEmail =  req.query.sendersEmail;

    // console.log('******************',sendersID, '& ' , recieversID);

    // make a query on Message Model
    let messages1 = await Message.find({sender: sendersID, reciever: recieversID}).populate('sender');
    let messages2 = await Message.find({sender: recieversID, reciever: sendersID}).populate('sender');

    // combine both arrays
    let updatedArray = messages1.concat(messages2);

    // console.log(updatedArray);

    // now we get those messages which we require
    return res.status(200).json({

        message: "Fetched Messages Array",
        data: {
            messages: updatedArray
        }

    });
}

module.exports.create = async function(req, res) {

    // console.log(req.params.id);
    // console.log(req.body.senders_id);

    // params
    var endUserID = req.params.id;
    const messageContent = req.body.message;
    var sendersID = req.body.senders_id;

    console.log(req.body);

    // find the user in database
    const EndUser = await User.findById(endUserID);
    const FrontUser = await User.findById(sendersID);

    if( !EndUser || !FrontUser){

        return res.status(422).json({

            message: 'User Not found'

        });
    }

    if( !EndUser ){

        return res.status(422).json({

            message: 'User Not found'

        });
    }


    //  If both of them found then create message
    let newMessage = await Message.create({
        message: messageContent,
        sender: sendersID,
        reciever: endUserID
    });

    return res.status(200).json({
        message: "new message created",
        data: {
            'new-message': newMessage
        }
    });
}