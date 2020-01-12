const repository = require('../../../../../src/repositories/partner-repository');
const handler = require('../../../../../src/api/v1/handlers/partner-handler');

describe('partner handlers tests', () => {
  test('should create partner', async () => {
    const partner = {
      _id: '5e1a74b479938561a08e225c',
      tradingName: 'Trading mock',
      ownerName: 'Owner mock',
      document: '66.368.821/0001-93',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: []
      },
      address: {
        type: 'Point',
        coordinates: []
      }
    };
    const partnerNew = {
      tradingName: 'trading mock',
      ownerName: 'owner mock',
      document: '66.368.821/0001-93',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: []
      },
      address: {
        type: 'Point',
        coordinates: []
      }
    };

    repository.post = jest.fn().mockReturnValue(partner);

    const result = await handler.post(partnerNew);

    expect(result).not.toBeNull();
    expect(result._id).toBe('5e1a74b479938561a08e225c');
  });

  test('should partner by id', async () => {
    const partnerId = '5e1a74b479938561a08e225c';
    const partner = {
      _id: partnerId,
      tradingName: 'Trading mock',
      ownerName: 'Owner mock',
      document: '66.368.821/0001-93',
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: []
      },
      address: {
        type: 'Point',
        coordinates: []
      }
    };

    repository.getById = jest.fn().mockReturnValue(partner);

    const result = await handler.getById(partnerId);

    expect(result).not.toBeNull();
    expect(result._id).toBe(partnerId);
  });

  test('should partner by position length 0', async () => {
    const partner = [];
    const long = -40.5;
    const lat = -20.5;

    repository.getAllPositions = jest.fn().mockReturnValue(partner);

    const result = await handler.getByPosition(long, lat);

    expect(result).toBeUndefined();
  });

  test('should partner by position length 1', async () => {
    const partners = [
      {
        _id: '5e1a74b479938561a08e225c',
        tradingName: 'Trading mock',
        ownerName: 'Owner mock',
        document: '66.368.821/0001-93',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: []
        },
        address: {
          type: 'Point',
          coordinates: []
        }
      }
    ];
    const long = -40.5;
    const lat = -20.5;

    repository.getAllPositions = jest.fn().mockReturnValue(partners);

    const result = await handler.getByPosition(long, lat);

    expect(result._id).toBe('5e1a74b479938561a08e225c');
  });

  describe('partner by positon minimum', () => {
    const partners = [
      {
        _id: '5e1a74b479938561a08e225c',
        tradingName: 'Trading mock 1',
        ownerName: 'Owner mock 1',
        document: '66.368.821/0001-93',
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
      },
      {
        _id: '5e1a9ebd8b62dfc0080baf1e',
        tradingName: 'Trading mock 2',
        ownerName: 'Owner mock 2',
        document: '16.189.116/0001-50',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-46.71746, -23.50814],
                [-46.72013, -23.50895],
                [-46.72331, -23.51276],
                [-46.7314, -23.51754],
                [-46.73517, -23.51802],
                [-46.74327, -23.51768],
                [-46.74558, -23.51865],
                [-46.74741, -23.52103],
                [-46.74988, -23.53096],
                [-46.7592, -23.52901],
                [-46.76383, -23.53423],
                [-46.76237, -23.53981],
                [-46.76265, -23.54499],
                [-46.76267, -23.54638],
                [-46.7665, -23.55032],
                [-46.76728, -23.55305],
                [-46.76578, -23.55804],
                [-46.76816, -23.55888],
                [-46.76984, -23.56],
                [-46.76898, -23.56319],
                [-46.76966, -23.56418],
                [-46.7709, -23.56438],
                [-46.77316, -23.5681],
                [-46.77244, -23.57034],
                [-46.7714, -23.571],
                [-46.77143, -23.57167],
                [-46.77334, -23.57443],
                [-46.77279, -23.57545],
                [-46.76582, -23.57661],
                [-46.77349, -23.58309],
                [-46.77057, -23.58317],
                [-46.76609, -23.5851],
                [-46.75923, -23.58626],
                [-46.75543, -23.5866],
                [-46.75637, -23.58853],
                [-46.75561, -23.59194],
                [-46.75383, -23.59133],
                [-46.74959, -23.59246],
                [-46.74921, -23.59576],
                [-46.74612, -23.59584],
                [-46.74738, -23.59764],
                [-46.74717, -23.59881],
                [-46.74908, -23.60437],
                [-46.75149, -23.6076],
                [-46.75246, -23.61047],
                [-46.75421, -23.61157],
                [-46.75866, -23.61809],
                [-46.7576, -23.62094],
                [-46.75616, -23.62263],
                [-46.75379, -23.624],
                [-46.7503, -23.62325],
                [-46.74992, -23.62368],
                [-46.75031, -23.62517],
                [-46.75172, -23.62673],
                [-46.7525, -23.62978],
                [-46.75181, -23.62961],
                [-46.75082, -23.63027],
                [-46.75152, -23.63161],
                [-46.75113, -23.63374],
                [-46.75316, -23.63496],
                [-46.75224, -23.63644],
                [-46.7508, -23.63674],
                [-46.74995, -23.63873],
                [-46.74885, -23.64001],
                [-46.74658, -23.64041],
                [-46.7398, -23.63817],
                [-46.73826, -23.6387],
                [-46.73671, -23.6423],
                [-46.7344, -23.64412],
                [-46.72789, -23.64492],
                [-46.71969, -23.65622],
                [-46.71228, -23.66182],
                [-46.71025, -23.66499],
                [-46.70431, -23.66086],
                [-46.70115, -23.65989],
                [-46.69244, -23.65575],
                [-46.68614, -23.65145],
                [-46.68205, -23.6522],
                [-46.67993, -23.65366],
                [-46.67227, -23.64407],
                [-46.67632, -23.64046],
                [-46.67728, -23.6366],
                [-46.68411, -23.63027],
                [-46.68516, -23.62789],
                [-46.68716, -23.6263],
                [-46.67834, -23.61362],
                [-46.67643, -23.6088],
                [-46.67014, -23.58382],
                [-46.67124, -23.57699],
                [-46.66195, -23.57038],
                [-46.65726, -23.56554],
                [-46.65586, -23.5619],
                [-46.65284, -23.55795],
                [-46.64905, -23.55543],
                [-46.64626, -23.55169],
                [-46.64571, -23.55409],
                [-46.6435, -23.55535],
                [-46.6358, -23.55661],
                [-46.62804, -23.55614],
                [-46.62566, -23.55299],
                [-46.62827, -23.54755],
                [-46.62891, -23.54329],
                [-46.62495, -23.53419],
                [-46.6251, -23.51908],
                [-46.64203, -23.51853],
                [-46.67793, -23.51396],
                [-46.68353, -23.51034],
                [-46.69496, -23.50818],
                [-46.70711, -23.50875],
                [-46.71746, -23.50814]
              ]
            ]
          ]
        },
        address: {
          type: 'Point',
          coordinates: [-46.689537, -23.560505]
        }
      }
    ];

    test('should partner by position minimum distance (mock 1)', async () => {
      const long = -46.6944;
      const lat = -23.5664;

      repository.getAllPositions = jest.fn().mockReturnValue(partners);

      const result = await handler.getByPosition(long, lat);

      expect(result._id).toBe('5e1a74b479938561a08e225c');
      expect(result.tradingName).toBe('Trading mock 1');
      expect(result.ownerName).toBe('Owner mock 1');
    });

    test('should partner by position minimum distance (mock 2)', async () => {
      const long = -46.6863453;
      const lat = -23.55894;

      repository.getAllPositions = jest.fn().mockReturnValue(partners);

      const result = await handler.getByPosition(long, lat);

      expect(result._id).toBe('5e1a9ebd8b62dfc0080baf1e');
      expect(result.tradingName).toBe('Trading mock 2');
      expect(result.ownerName).toBe('Owner mock 2');
    });
  });
});
