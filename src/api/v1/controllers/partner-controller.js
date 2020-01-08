'use strict';

const validator = require('express-validator');
const handler = require('../handlers/partner-handler');

const getById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send();
    }

    const partner = await handler.getById(id);

    if (!partner) {
        return res.status(404).send();
    }

    res.status(200).send(partner);
};

const post = async (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).send();
    }

    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array()
        });
    }

    const partner = await handler.post(data);
    res.status(201).send(partner);
};

module.exports = {
    getById,
    post
};