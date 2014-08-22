'use strict';

// Get list of things
exports.index = function(req, res) {
    console.log("/home -> index");
    console.log(req.session);
    if (req.session.userid) {
        res.render('index', {layout: 'loggedin'});  
    } else {
        res.redirect('/login');
    }
};

function handleError(err, res) {
    return res.send(500, err);
}