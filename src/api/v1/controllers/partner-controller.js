'use strict';

const validator = require('express-validator');
const handler = require('../handlers/partner-handler');

const post = async (req, res) => {
    const data = req.body;

    if (!data) {
        res.status(400).send();
        return;
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
    post
};