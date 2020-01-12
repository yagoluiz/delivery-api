process.env.NODE_ENV = 'test';

const database = require('../../../src/database/mongo-database');
const repository = require('../../../src/repositories/partner-repository');
const Partner = require('../../../src/models/partner');

describe('partner repository tests', () => {
  let partner;
  let document;

  beforeAll(() => {
    document = '95.221.283/0001-08';
    partner = {
      tradingName: 'Bar do Zé',
      ownerName: 'João Silva',
      document: document,
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [
            [
              [-46.76338, -23.53597],
              [-46.7311, -23.60489],
              [-46.70055, -23.61936],
              [-46.6842, -23.63009],
              [-46.6766, -23.63894],
              [-46.66641, -23.62915],
              [-46.66131, -23.62771],
              [-46.66186, -23.6196],
              [-46.6595, -23.61805],
              [-46.6508, -23.62341],
              [-46.64678, -23.62989],
              [-46.62982, -23.62927],
              [-46.62673, -23.61484],
              [-46.62811, -23.60982],
              [-46.6209, -23.59442],
              [-46.61515, -23.58345],
              [-46.6094, -23.57719],
              [-46.60764, -23.57397],
              [-46.60785, -23.56925],
              [-46.61397, -23.55929],
              [-46.62352, -23.55578],
              [-46.62871, -23.54404],
              [-46.62485, -23.52008],
              [-46.6778, -23.51402],
              [-46.68331, -23.51027],
              [-46.69636, -23.50809],
              [-46.71939, -23.50878],
              [-46.73314, -23.50409],
              [-46.75288, -23.4986],
              [-46.751, -23.51262],
              [-46.76338, -23.53597]
            ]
          ]
        ]
      },
      address: {
        type: 'Point',
        coordinates: [-46.693768, -23.569365]
      }
    };
    database.connect();
  });

  afterAll(async () => {
    await Partner.collection.drop();
  });

  describe('tests partner return', () => {
    let partnerId = 0;

    test('should create partners to equal properties', async () => {
      const result = await repository.post(partner);

      partnerId = result._id;

      expect(result.tradingName).toBe('Bar do Zé');
      expect(result.ownerName).toBe('João Silva');
      expect(result.document).toBe(document);
      expect(result.coverageArea).toHaveProperty('type');
      expect(result.coverageArea).toHaveProperty('coordinates');
      expect(result.address).toHaveProperty('type');
      expect(result.address).toHaveProperty('coordinates');
    });

    test('should get partner by id to equal properties', async () => {
      const result = await repository.getById(partnerId);

      expect(result.tradingName).toBe('Bar do Zé');
      expect(result.ownerName).toBe('João Silva');
      expect(result.document).toBe(document);
      expect(result.coverageArea).toHaveProperty('type');
      expect(result.coverageArea).toHaveProperty('coordinates');
      expect(result.address).toHaveProperty('type');
      expect(result.address).toHaveProperty('coordinates');
    });

    test('should get partner by document to equal properties', async () => {
      const result = await repository.getByDocument(document);

      expect(result.tradingName).toBe('Bar do Zé');
      expect(result.ownerName).toBe('João Silva');
      expect(result.document).toBe(document);
      expect(result.coverageArea).toHaveProperty('type');
      expect(result.coverageArea).toHaveProperty('coordinates');
      expect(result.address).toHaveProperty('type');
      expect(result.address).toHaveProperty('coordinates');
    });

    test('should get all partners by position to equal properties', async () => {
      const long = -46.68634;
      const lat = -23.55894;
      const results = await repository.getAllPositions(long, lat);

      const result = results[0];

      expect(result.tradingName).toBe('Bar do Zé');
      expect(result.ownerName).toBe('João Silva');
      expect(result.document).toBe(document);
      expect(result.coverageArea).toHaveProperty('type');
      expect(result.coverageArea).toHaveProperty('coordinates');
      expect(result.address).toHaveProperty('type');
      expect(result.address).toHaveProperty('coordinates');
    });
  });

  describe('tests not partner return', () => {
    test('should get partner by id to be null', async () => {
      const partnerId = 'FFFFFFFFFFFFFFFFFFFFFFFF';
      const result = await repository.getById(partnerId);

      expect(result).toBeNull();
    });

    test('should get partner by document to be null', async () => {
      const documentFailed = '00.000.000/0000-00';
      const result = await repository.getByDocument(documentFailed);

      expect(result).toBeNull();
    });

    test('should get all partners by position to be array', async () => {
      const long = 180;
      const lat = 90;
      const result = await repository.getAllPositions(long, lat);

      expect(result).toStrictEqual([]);
    });
  });
});
