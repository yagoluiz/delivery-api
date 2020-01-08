'use strict';

const repository = require('../../../repositories/partner-repository');

const getById = async (id) => {
    const partner = await repository.getById(id);
    return partner;
};

const post = async (data) => {
    const partner = await repository.post({
        tradingName: data.tradingName,
        ownerName: data.ownerName,
        document: data.document,
        coverageArea: data.coverageArea,
        address: data.address
    });
    return partner;
};

module.exports = {
    getById,
    post
};