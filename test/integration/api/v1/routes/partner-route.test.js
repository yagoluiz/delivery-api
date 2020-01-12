'use strict';

process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../../../../../src/app');
const Partner = require('../../../../../src/models/partner');

describe('partner routes tests', () => {
    let partner = {};
    let document = undefined;

    beforeAll(() => {
        document = '99.163.258/0001-76';
        partner = {
            tradingName: "Adega da Cerveja - Pinheiros",
            ownerName: "Zé da Silva",
            document: document,
            coverageArea: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [
                                -43.50404,
                                -22.768366
                            ],
                            [
                                -43.45254,
                                -22.775646
                            ],
                            [
                                -43.429195,
                                -22.804451
                            ],
                            [
                                -43.38422,
                                -22.788942
                            ],
                            [
                                -43.390743,
                                -22.764568
                            ],
                            [
                                -43.355724,
                                -22.739239
                            ],
                            [
                                -43.403446,
                                -22.705671
                            ],
                            [
                                -43.440525,
                                -22.707571
                            ],
                            [
                                -43.4752,
                                -22.698704
                            ],
                            [
                                -43.514683,
                                -22.742722
                            ],
                            [
                                -43.50404,
                                -22.768366
                            ]
                        ]
                    ]
                ]
            },
            address: {
                type: "Point",
                coordinates: [
                    -43.432034,
                    -22.747707
                ]
            }
        };
    });

    afterAll(async () => {
        await Partner.collection.drop();
    });

    describe('tests success', () => {
        let partnerId = 0;

        test('should create partner', async () => {
            const res = await request(app)
                .post('/api/v1/partners')
                .send(partner);

            partnerId = res.body._id;

            expect(res.statusCode).toEqual(201);
            expect(res.body.tradingName).toBe('Adega da Cerveja - Pinheiros');
            expect(res.body.ownerName).toBe('Zé da Silva');
            expect(res.body.document).toBe(document);
            expect(res.body.coverageArea).toHaveProperty('type');
            expect(res.body.coverageArea).toHaveProperty('coordinates');
            expect(res.body.address).toHaveProperty('type');
            expect(res.body.address).toHaveProperty('coordinates');
        });

        test('should get partner by id', async () => {
            const res = await request(app)
                .get(`/api/v1/partners/${partnerId}`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body.tradingName).toBe('Adega da Cerveja - Pinheiros');
            expect(res.body.ownerName).toBe('Zé da Silva');
            expect(res.body.document).toBe(document);
            expect(res.body.coverageArea).toHaveProperty('type');
            expect(res.body.coverageArea).toHaveProperty('coordinates');
            expect(res.body.address).toHaveProperty('type');
            expect(res.body.address).toHaveProperty('coordinates');
        });

        test('should get partner by position', async () => {
            const long = -43.441034;
            const lat = -22.736707;
            const res = await request(app)
                .get(`/api/v1/partners/long/${long}/lat/${lat}`)
                .send();

            expect(res.statusCode).toEqual(200);
            expect(res.body.tradingName).toBe('Adega da Cerveja - Pinheiros');
            expect(res.body.ownerName).toBe('Zé da Silva');
            expect(res.body.document).toBe(document);
            expect(res.body.coverageArea).toHaveProperty('type');
            expect(res.body.coverageArea).toHaveProperty('coordinates');
            expect(res.body.address).toHaveProperty('type');
            expect(res.body.address).toHaveProperty('coordinates');
        });
    });

    describe('tests validations', () => {
        test('should not create partner param required', async () => {
            const partner = {};
            const res = await request(app)
                .post('/api/v1/partners')
                .send(partner);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('errors');
        });

        test('should not create partner param document invalid', async () => {
            partner.document = '00.000.000/0000-00';
            const res = await request(app)
                .post('/api/v1/partners')
                .send(partner);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('errors');
        });

        test('should not create partner param coverageArea invalid', async () => {
            partner.coverageArea = {
                type: "MultiPolygon",
                coordinates: [
                    -46.57421,
                    -21.785741
                ]
            };
            const res = await request(app)
                .post('/api/v1/partners')
                .send(partner);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('errors');
        });

        test('should not create partner param address invalid', async () => {
            partner.address = {
                type: "Point",
                coordinates: [
                    [
                        [
                            [
                                30,
                                20
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                15,
                                5
                            ]
                        ]
                    ]
                ]
            };
            const res = await request(app)
                .post('/api/v1/partners')
                .send(partner);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('errors');
        });

        test('should get partner by id not param', async () => {
            const partnerId = undefined;
            const res = await request(app)
                .get(`/api/v1/partners/${partnerId}`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('errors');
        });

        test('should get partner by id not found id UUID param', async () => {
            const partnerId = 'FFFFFFFFFFFFFFFFFFFFFFFF';
            const res = await request(app)
                .get(`/api/v1/partners/${partnerId}`)
                .send();

            expect(res.statusCode).toEqual(404);
        });

        test('should get partner by position not numeric param', async () => {
            const long = undefined;
            const lat = undefined;
            const res = await request(app)
                .get(`/api/v1/partners/long/${long}/lat/${lat}`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('errors');
        });

        test('should get partner by position not long/lat valid param', async () => {
            const long = 1000;
            const lat = 1000;
            const res = await request(app)
                .get(`/api/v1/partners/long/${long}/lat/${lat}`)
                .send();

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('errors');
        });

        test('should get partner by position not found long/lat param', async () => {
            const long = -0;
            const lat = -0;
            const res = await request(app)
                .get(`/api/v1/partners/long/${long}/lat/${lat}`)
                .send();

            expect(res.statusCode).toEqual(404);
        });
    });
});