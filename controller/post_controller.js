const Post = require('../models/post');
const Comment = require('../models/comment');

// ------------------------------- Create Post ----------------------------------- //
module.exports.createPost = async function(req, res) {

    let post = await Post.create({

        content : req.body.content,
        user : req.user._id

    });

    console.log('New Post - ', post);

    // now instead of using 'return res.redirect('back');' use ajax request so that page do not get refreshed
    if(req.xhr) {
        // return JSON from here
        return res.status(200).json({
            data : {
                user : req.user.name,
                post : post
            },
            
            message : "Post Created Successfully !"
        });
    }

    req.flash('success', 'Your post published successfully');
    return res.redirect('back');
}

// ---------------------------------------Delete any post --------------------------------------- //

// we are getting post id from view section
module.exports.destroy = async function(req, res) {

    // we are getting post id
    // so find that post exists in database

    // this id in params is from posts route
    let post = await Post.findById(req.params.id);

    // then check if posts id is same to logged in users id
    // without populating user key in database POST, user is just id of the refering user
    if(post.user == req.user.id) {

        post.remove();

        // also remove all comments from the post
        await Comment.deleteMany({post : req.params.id});

        // check if there is any xhr request
        if(req.xhr) {

            return res.status(200).json({
                data : {
                    post_id : req.params.id
                }
            });

        }

        req.flash('success', 'Post Deleted Successfully');
        return res.redirect('back');
    }
    
    else{
        req.flash('error', 'Not Authorized');
        return res.redirect('back');
    }
}