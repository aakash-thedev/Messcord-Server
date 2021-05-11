// --------------------------------- HOME ----------------------------------- //

module.exports.sync = function(req, res) {
    return res.status(200).json({
        data : {
            messages : ["msg1", "msg2"]
        }
    });
}