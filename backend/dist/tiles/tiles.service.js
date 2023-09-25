'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TilesService = void 0;
const common_1 = require('@nestjs/common');
const tilesData_1 = require('../constants/tilesData');
const shuffleArray_1 = require('../service/shuffleArray');
let TilesService = class TilesService {
  getTiles() {
    let tiles = tilesData_1.tilesData;
    tiles = (0, shuffleArray_1.shuffleArray)(tilesData_1.tilesData);
    if (!!tiles) {
      return tiles;
    }
    return undefined;
  }
  getSingleTile(id) {
    const tile = tilesData_1.tilesData.find((tile) => tile.id === id);
    return tile;
  }
};
TilesService = __decorate([(0, common_1.Injectable)()], TilesService);
exports.TilesService = TilesService;
//# sourceMappingURL=tiles.service.js.map
