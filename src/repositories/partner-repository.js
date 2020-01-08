'use strict';

const Partner = require('../models/partner');

const getByDocument = async (document) => {
    const partner = await Partner.findOne({
        document: document
    });
    return partner;
};

const post = async (data) => {
    const partner = new Partner(data);
    await partner.save();
    return partner;
};

module.exports = {
    getByDocument,
    post
};