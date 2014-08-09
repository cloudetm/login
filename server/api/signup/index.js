'use strict';

var express = require('express');
var controller = require('./signup.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/validate', controller.validateEmail);

module.exports = router;