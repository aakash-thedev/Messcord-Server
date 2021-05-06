module.exports.setFlash = function(req, res, next) {

    // set request's flash message to response's flash message so that we can use it in our view
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }

    next();
}