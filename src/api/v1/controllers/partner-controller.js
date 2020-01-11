'use strict';

const validator = require('express-validator');
const handler = require('../handlers/partner-handler');

const getById = async (req, res) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array()
        });
    }

    const id = req.params.id;
    const partner = await handler.getById(id);

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

    const long = req.params.long;
    const lat = req.params.lat;
    const partner = await handler.getByPosition(long, lat);

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

    const data = req.body;
    const partner = await handler.post(data);

    res.status(201).send(partner);
};

module.exports = {
    getById,
    getByPosition,
    post
};