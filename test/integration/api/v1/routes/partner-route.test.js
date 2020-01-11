'use strict';

const request = require('supertest');
const cnpj = require('cnpj');
const app = require('../../../../../src/app');

describe('partner routes tests', () => {
    let partner = {};

    beforeEach(() => {
        partner = {
            tradingName: "Adega da Cerveja - Pinheiros",
            ownerName: "Zé da Silva",
            document: cnpj.generate(),
            coverageArea: {
                type: "MultiPolygon",
                coordinates: [
                    [
                        [
                            [
                                30,
                                20
                            ],
                            [
                                45,
                                40
                            ],
                            [
                                10,
                                40
                            ],
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
                            ],
                            [
                                40,
                                10
                            ],
                            [
                                10,
                                20
                            ],
                            [
                                5,
                                10
                            ],
                            [
                                15,
                                5
                            ]
                        ]
                    ]
                ]
            },
            address: {
                type: "Point",
                coordinates: [
                    -46.57421,
                    -21.785741
                ]
            }
        };
    });

    describe('partner integration test success', () => {
        let partnerId = 0;
        test('should create partners', async () => {
            const res = await request(app)
                .post('/api/v1/partners')
                .send(partner);

            partnerId = res.body._id;
            expect(res.statusCode).toEqual(201);
        });

        test('should get partner by id', async () => {
            const res = await request(app)
                .get(`/api/v1/partners/${partnerId}`)
                .send();

            expect(res.statusCode).toEqual(200);
        });

        test('should get partner by coordinates', async () => {
            const long = -46.57421;
            const lat = -21.785741;
            const res = await request(app)
                .get(`/api/v1/partners/long/${long}/lat/${lat}`)
                .send();

            expect(res.statusCode).toEqual(200);
        });
    });

    describe('partner integration test failed', () => {
        test('should get partner by id not param', async () => {
            const partnerId = undefined;
            const res = await request(app)
                .get(`/api/v1/partners/${partnerId}`)
                .send();

            expect(res.statusCode).toEqual(400);
        });

        test('should get partner by id not found id UUID param', async () => {
            const partnerId = "FFFFFFFFFFFFFFFFFFFFFFFF";
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
        });

        test('should get partner by position not long/lat valid param', async () => {
            const long = 1000;
            const lat = 1000;
            const res = await request(app)
                .get(`/api/v1/partners/long/${long}/lat/${lat}`)
                .send();

            expect(res.statusCode).toEqual(400);
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