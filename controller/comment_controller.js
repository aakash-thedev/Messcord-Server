const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = async function(req, res) {

    // we are getting req.body.post because we have given corresponding post id in an input field in _postContainer view
    // find the post in Post database
    try{

        let post = await Post.findById(req.body.post);

        if(post) {

            let comment = await Comment.create({
                comment : req.body.comment,
                user : req.user._id,
                post : req.body.post
            });

            // so new comment has been created
            // update post by pushing this new comment
            post.comments.push(comment);
            post.save();

            console.log(`new comment - ${comment}`);

            if(req.xhr) {

                return res.status(200).json({
                    data : {
                        comment : comment,
                        userCommented : req.user.name
                    }
                });
            }

            return res.redirect('back');
        }

        console.log(`cannot find post !`);
        return res.redirect('back');
    }

    catch(err){
        console.log('Error- ', err);
    }

}

// -------------------------- delete a comment --------------------------- //

// do cheeze hain ek to kisi bnde ne kisi aur ki post pe comment kiya hoga vo khud use delete kr skta hai
// dusri cheez jis bnde ka post hai vo bhi apni post ke andar kisi aur ke comment ko delete kr skta hai

module.exports.destroy = function(req, res) {

    // find the comment
    Comment.findById(req.params.id).populate('post').exec(function(err, comment) {

        if(err) { console.log(`error finding comment in database - ${err}`); return res.redirect('back'); }

        // assuming that we found the comment
        if(comment.user == req.user.id || comment.post.user == req.user.id) {

            comment.remove();

            // also remove the comment id from post database
            let index = comment.post.comments.find((comm) => {return comm == req.params.id });

            comment.post.comments.splice(index, 1);

            comment.post.save();

            req.flash('success', 'Comment Deleted !');

            if(req.xhr) {

                return res.status(200).json({

                    data : {
                        comment_id : req.params.id
                    }

                });

            }

            return res.redirect('back');

        }

        else{

            return res.redirect('back');
        }

    });

}