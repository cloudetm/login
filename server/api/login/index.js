'use strict';

var express = require('express');
var controller = require('./login.controller');

var router = express.Router();




router.get('/', controller.index);
// router.get('/:id', controller.show);
router.post('/', controller.validate);
router.delete('/', controller.delete);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;