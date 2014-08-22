/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

   // app.use('/api/things', require('./api/thing'));
   app.use('/login', require('./api/login'));
   app.use('/signup', require('./api/signup'));
   app.use('/home', require('./api/home'));
   app.use('/', require('./api/home'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

    
    app.route('/*')
    .get(function(req, res) {
      res.render('404', {
        title:'welcome',
        layout: false
      });
    });
};
