"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const webSocketEvents_1 = require("../constants/webSocketEvents");
let TilesGateway = class TilesGateway {
    handleTilePlacementMessage(client, rec) {
        const message = { tileData: rec.tileData, clientId: client.id };
        client.to(rec.room).emit(webSocketEvents_1.default.RECEIVE_TILE_PLACED, message);
    }
    handleTileInHandRotated(client, rec) {
        const message = { rotation: rec.rotation, clientId: client.id };
        client.to(rec.room).emit(webSocketEvents_1.default.RECEIVE_TILE_ROTATED, message);
    }
};
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.SEND_TILE_PLACED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], TilesGateway.prototype, "handleTilePlacementMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.SEND_TILE_ROTATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], TilesGateway.prototype, "handleTileInHandRotated", null);
TilesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], TilesGateway);
exports.TilesGateway = TilesGateway;
//# sourceMappingURL=tiles.gateway.js.map