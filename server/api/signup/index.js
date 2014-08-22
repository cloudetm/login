'use strict';

var express = require('express');
var controller = require('./signup.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/validate', controller.validateEmail);
router.get('/forgot', controller.forgot);
router.post('/forgot', controller.forgotSendMail);
router.get('/forgot/requestreply', controller.requestReply);
router.get('/reset', controller.reset);
router.post('/reset', controller.updatePassword);
router.get('/passwordupdated', controller.passwordUpdated);

module.exports = router;