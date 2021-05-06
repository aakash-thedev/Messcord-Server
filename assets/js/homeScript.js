{
    // ------------------------------------ Create Post Data using AJAX req----------------------------------- //

    var deletePostLinks = document.getElementsByClassName('delete-post-btn');
    let commentsDeleteLinks = document.querySelectorAll('.comment-section>a');

    // var getAllPosts = function() {

    //     $.ajax({

    //         type : 'get',
    //         url : '/',
    //         success : function(data) {
    //             displayPostsDOM(data.data.posts, data.data.users);
    //         },

    //         error : function(err) {
    //             console.log(err);
    //         }

    //     });
    // }

    // var displayPostsDOM = function(postsArray, usersArray) {

    //     console.log('POSTS', postsArray);
    //     console.log('USERS', usersArray);

    //     for(let post of postsArray) {

    //         let newPost = newPostDOM(post, post.user.name);
    //         $('#new-feeds').append(newPost);

    //     }
    // }

    // getAllPosts();

    var createPost = function() {

        var newPostForm = $('#new-post-form');
    
        newPostForm.submit(function(e) {

            // to prevent the form to submit it naturally
            e.preventDefault();

            // now submit the form using ajax request
            $.ajax({
                type: "post",
                url: "/posts/create-post",
                data: newPostForm.serialize(), // serialize() will convert the data into JSON format
                success: function (data) {
                    var  newPost = newPostDOM(data.data.post, data.data.user);
                    $('#new-feeds').prepend(newPost);

                    for(let delete_btn of deletePostLinks) {
                        deletePostDOM(delete_btn);
                    }

                    createComment();
                    console.log(data);
                },

                error : function(err) {
                    console.log(err);
                }
            });
        });
    }

        // ------------ now in above once we sent the data from ajax we will recieve it on post controller --------- //

    // ---------------- create a DOM to display it on screen ----------------------- //
    
    var newPostDOM = function(post, userPosted) {

        return $(`
        
            <div class="post-container" id="post-${post._id}">

                <!-- create option menu for delete and etc options-->

                <a href="/posts/destroy/${post._id}" class="delete-post-btn"><i class="far fa-trash-alt"></i></a>

                <span class="post-profile-photo"></span>

                <span class="post-author">

                    ${ userPosted }

                    <div id="post-time-date">
                        <!-- String(postsArray[i].createdAt).substring(0, 16) + ", " + String(postsArray[i].createdAt).substring(16, 21) -->
                        Just now
                    </div>

                </span>

                <div class="post-content">
                    ${post.content}
                </div>

                <div class="likes-comment-share">
                    <i class="far fa-thumbs-up"> &nbsp; Like</i>
                    <i class="far fa-comment"> &nbsp; Comment</i>
                    <i class="fas fa-share"> &nbsp; <span>Share</span></i>
                </div>

                <div class="display-comments">

                </div>

                <div class="post-comments">

                    <form method="POST" action="/comments/create-comment" autocomplete="off" id="new-comment-form">

                        <span class="comment-profile-photo"></span>

                        <input type="text" name="comment" class="comment-content" placeholder="Comment" required></input>
                        <!-- we have to send id of the post to comments as well -->
                        <input type="hidden" name="post" value="${post._id}">
                        <button type="submit" class="comment-btn"> <i class="far fa-paper-plane"></i> </button>

                    </form>

                </div>

            </div>`
        
        );
    }

    createPost();

    // ------------------------------ method to delete a post from DOM ------------------------------------- //

    // we will pass a tag which is clicked to the function 
    var deletePostDOM = function(deleteLink) {

        var post_id = $(deleteLink).prop('href').substring(36);

        console.log("Link", post_id);

        // for(let link of deleteLink) {}

        $(deleteLink).click(function(event) {

            event.preventDefault();

            // now delete the post from DOM using AJAX
            
            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data) {
                    // we will get the id of post in our data
                    $('.post-container').remove(`#post-${data.data.post_id}`);
                    console.log('POST removed from DOM');

                },
                error : function(err) {
                    console.log(err.responseText);
                }
            });

        });
    }

    for(let link of deletePostLinks) {
        deletePostDOM(link);
    }

    // --------------------------- create a comment in the post --------------------------- //

    let createComment = function() {

        console.log("Comment Clicked");

        // now selec the new comment form
        let newCommentForm = $('#new-comment-form');

        // when this form is submitted
        newCommentForm.submit(function(event) {

            event.preventDefault();

            // now post the comment using ajax request
            $.ajax({
                type : 'post',
                url : '/comments/create-comment',
                data : newCommentForm.serialize(),
                success : function(data){
                    let newComment = createCommentDOM(data.data.comment, data.data.userCommented);
                    $('.display-comments').append(newComment);
                    console.log(data);
                },

                error : function(err) {
                    console.log(err);
                }
            });

        });
        
    }

    let createCommentDOM = function(comment, userCommented) {

        return $(`

            <div class="comment-section" id="comment-${comment.id}">

                <span class="comment-author"> ${userCommented} </span> - &nbsp;
                <span class="comment"> ${comment.comment} </span>
                        
                <a href="/comments/destroy/${comment.id}" class="delete-comment"><i class="fas fa-trash"></i></a>
            
            </div>
        `);

    }

    let deleteCommentDOM = function(deleteCommentLink) {

        $(deleteCommentLink).click(function(event){

            event.preventDefault();

            // and delete the comment via ajax request

            $.ajax({
                type : 'get',
                url : $(deleteCommentLink).prop('href'),
                success : function(data) {

                    $('.display-comments').remove(`#comment-${data.data.comment_id}`);
                },

                error : function(err) {
                    console.log(err);
                }
            });

        });
    }

    for(let link of commentsDeleteLinks) {

        deleteCommentDOM(link);

    }
}