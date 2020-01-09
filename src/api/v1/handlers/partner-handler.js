'use strict';

const repository = require('../../../repositories/partner-repository');
const turf = require('@turf/turf');

const getById = async (id) => {
    const partner = await repository.getById(id);
    return partner;
};

const getByPosition = async (long, lat) => {
    const partners = await repository.getAllPositions(long, lat);

    if (!partners) {
        return;
    }

    let partner = undefined;
    let distanceMin = Number.MAX_SAFE_INTEGER;

    partners.forEach(partnerPosition => {
        const coordinates = partnerPosition.address.coordinates;
        const from = turf.point([long, lat]);
        const to = turf.point([coordinates[0], coordinates[1]]);
        const distance = turf.distance(from, to);

        if (distance < distanceMin) {
            distanceMin = distance;
            partner = partnerPosition;
        }
    });

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
    getByPosition,
    post
};