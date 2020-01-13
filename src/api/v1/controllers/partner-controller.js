const validator = require('express-validator');
const handler = require('../handlers/partner-handler');

const getById = async (req, res) => {
  const errors = validator.validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array()
    });
  }

  const partner = await handler.getById(req.params.id);

  if (!partner) {
    return res.status(404).send();
  }

  res.status(200).send(partner);
};

const getByPosition = async (req, res) => {
  const errors = validator.validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array()
    });
  }

  const partner = await handler.getByPosition(req.params.long, req.params.lat);

  if (!partner) {
    return res.status(404).send();
  }

  res.status(200).send(partner);
};

const post = async (req, res) => {
  const errors = validator.validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array()
    });
  }

  const partner = await handler.post(req.body);

  res.status(201).send(partner);
};

module.exports = {
  getById,
  getByPosition,
  post
};
