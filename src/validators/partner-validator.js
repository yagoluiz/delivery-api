'use strict';

const validator = require('express-validator');
const cnpj = require('cnpj');
const geojson = require("geojson-validation");
const repository = require('../repositories/partner-repository');

const uuidValidator = [
    validator.param('id')
        .notEmpty()
        .withMessage('Field required')
        .custom(async value => {
            if (!value) {
                return;
            }

            const regex = new RegExp('^[0-9a-fA-F]{24}$');
            const isUUID = regex.test(value);
            if (!isUUID) {
                throw new Error('Id format invalid');
            }

            return true;
        })
];

const positionValidator = [
    validator.param('long')
        .isNumeric()
        .withMessage('Field invalid')
        .custom(async value => {
            if (!value) {
                return;
            }

            if (value < -180 || value > 180) {
                throw new Error('long invalid');
            }

            return true;
        }),
    validator.param('lat')
        .isNumeric()
        .withMessage('Field invalid')
        .custom(async value => {
            if (!value) {
                return;
            }

            if (value < -90 || value > 90) {
                throw new Error('lat invalid');
            }
        })
];

const partnerValidator = [
    validator.body('tradingName')
        .notEmpty()
        .withMessage('Field required'),
    validator.body('ownerName')
        .notEmpty()
        .withMessage('Field required'),
    validator.body('document')
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
    validator.body('coverageArea')
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
    validator.body('address')
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

module.exports = {
    uuidValidator,
    positionValidator,
    partnerValidator
};