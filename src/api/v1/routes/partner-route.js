'use strict';

const express = require('express');
const controller = require('../controllers/partner-controller');
const validator = require('../../../validators/partner-validator');

const router = express.Router();

router.get('/:id', controller.getById);
router.post('/', validator, controller.post);

module.exports = router;