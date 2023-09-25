'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TileSchema = exports.Locations = void 0;
const mongoose = require('mongoose');
var Locations;
(function (Locations) {
  Locations['FIELD'] = 'FIELD';
  Locations['ROAD'] = 'ROAD';
  Locations['CITY'] = 'CITY';
  Locations['GARDEN'] = 'GARDEN';
  Locations['MONASTERY'] = 'MONASTERY';
  Locations['TAVERN'] = 'TAVERN';
})((Locations = exports.Locations || (exports.Locations = {})));
exports.TileSchema = new mongoose.Schema({
  tileId: { type: String, required: true },
  edges: {
    top: { type: String, required: true },
    right: { type: String, required: true },
    bottom: { type: String, required: true },
    left: { type: String, required: true },
  },
  middle: { type: Array, required: true },
  isSpecial: { type: Boolean, default: false, required: true },
});
//# sourceMappingURL=tile.model.js.map
