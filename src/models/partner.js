const mongoose = require('mongoose');
const GeoJSON = require('mongoose-geojson-schemas');

const PartnerSchema = new mongoose.Schema(
  {
    tradingName: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    document: {
      type: String,
      required: true,
      unique: true
    },
    coverageArea: GeoJSON.MultiPolygon,
    address: GeoJSON.Point
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('partners', PartnerSchema);
