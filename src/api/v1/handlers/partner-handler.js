'use strict';

const repository = require('../../../repositories/partner-repository');

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
    post
};