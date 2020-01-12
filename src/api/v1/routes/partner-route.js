const express = require('express');
const controller = require('../controllers/partner-controller');
const validator = require('../../../validators/partner-validator');

const router = express.Router();

router.get('/:id', validator.uuidValidator, controller.getById);
router.get(
  '/long/:long/lat/:lat',
  validator.positionValidator,
  controller.getByPosition
);
router.post('/', validator.partnerValidator, controller.post);

module.exports = router;
