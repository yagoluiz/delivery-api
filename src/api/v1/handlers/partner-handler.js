const turf = require('@turf/turf');
const repository = require('../../../repositories/partner-repository');

const getById = async id => {
  const partner = await repository.getById(id);
  return partner;
};

const getByPosition = async (long, lat) => {
  const partners = await repository.getAllPositions(long, lat);

  if (partners.length === 0) {
    return;
  }

  if (partners.length === 1) {
    return partners[0];
  }

  let partner;
  let distanceMin = Number.MAX_SAFE_INTEGER;

  partners.forEach(partnerPosition => {
    const from = turf.point([long, lat]);
    const to = turf.point([
      partnerPosition.address.coordinates[0],
      partnerPosition.address.coordinates[1]
    ]);
    const distance = turf.distance(from, to);

    if (distance < distanceMin) {
      distanceMin = distance;
      partner = partnerPosition;
    }
  });

  return partner;
};

const post = async data => {
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
