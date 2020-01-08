'use strict';

const validator = require('express-validator');
const cnpj = require('cnpj');
const geojson = require("geojson-validation");
const repository = require('../repositories/partner-repository');

const partnerValidator = [
    validator.check('tradingName')
        .notEmpty()
        .withMessage('Field required'),
    validator.check('ownerName')
        .notEmpty()
        .withMessage('Field required'),
    validator.check('document')
        .notEmpty()
        .withMessage('Field required')
        .custom(async value => {
            if (!value) {
                return;
            }

            const isDocument = cnpj.validate(value);
            if (!isDocument) {
                throw new Error('Document invalid');
            }

            const existDocument = await repository.getByDocument(value);
            if (existDocument) {
                throw new Error('Document exist');
            }

            return true;
        }),
    validator.check('coverageArea')
        .notEmpty()
        .withMessage('Field required')
        .custom(value => {
            if (!value) {
                return;
            }

            const isMultiPolygon = geojson.isMultiPolygon(value);
            if (!isMultiPolygon) {
                throw new Error('MultiPolygon format invalid');
            }

            return true;
        }),
    validator.check('address')
        .notEmpty()
        .withMessage('Field required')
        .custom(value => {
            if (!value) {
                return;
            }

            const isPoint = geojson.isPoint(value);
            if (!isPoint) {
                throw new Error('Point format invalid');
            }

            return true;
        })
];

module.exports = partnerValidator;