/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('static-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session       = require('express-session');
var redisStore    = require('connect-redis')(session);
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var hbsExp  = require('express-handlebars');
var nodemailer    = require("nodemailer");
// var redis  = require("redis").createClient(config.redis.port, config.redis.host);
var hbs;

module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views/partials');

  hbs = hbsExp.create({
    defaultLayout: 'layouts',
    layoutsDir :"views/layouts/",
    partialsDir: [
        'shared/templates/',
        'views/partials/'
    ]
  });
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  app.use(express.static(path.join(config.root, 'client/')));
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  

  app.use(function (req, res, next) {
  // check if client sent cookie
    var cookie = req.cookies.cokkieName;
      if (cookie != undefined){
        console.log('cookie exists', cookie);
      }  
      next(); // <-- important!
  });

  app.use(session({
      store: new redisStore({
        host: config.redis.host,
        port: config.redis.port
      }),
    secret: config.session.secret,
    key: config.session.key
  }));


  

  // if ('production' === env) {
  //   app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
  //   app.use(express.static(path.join(config.root, 'public')));
  //   app.set('appPath', config.root + '/public');
  //   app.use(morgan('dev'));
  // }

  if ('development' === env || 'test' === env) {
    // app.use(require('connect-livereload')());
    // app.use(express.static(path.join(config.root, '.tmp')));
    // app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};