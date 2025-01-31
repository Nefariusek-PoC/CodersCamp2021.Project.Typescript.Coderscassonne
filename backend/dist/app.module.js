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
exports.AppModule = void 0;
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const app_controller_1 = require('./app.controller');
const game_gateway_1 = require('./game.gateway');
const app_messagehandler_service_1 = require('./app.messagehandler.service');
const app_service_1 = require('./app.service');
const room_gateway_1 = require('./room.gateway');
const tiles_gateway_1 = require('./tiles/tiles.gateway');
const tiles_module_1 = require('./tiles/tiles.module');
const players_gateway_1 = require('./players.gateway');
let AppModule = class AppModule {};
AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [tiles_module_1.TilesModule, config_1.ConfigModule.forRoot()],
      controllers: [app_controller_1.AppController],
      providers: [
        app_service_1.AppService,
        game_gateway_1.GameGateway,
        app_messagehandler_service_1.MassageHandler,
        tiles_gateway_1.TilesGateway,
        room_gateway_1.RoomGateway,
        players_gateway_1.PlayerGateway,
      ],
    }),
  ],
  AppModule,
);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
