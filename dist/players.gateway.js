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
exports.PlayerGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const webSocketEvents_1 = require("./constants/webSocketEvents");
const room_gateway_1 = require("./room.gateway");
const playersInRooms = [];
let PlayerGateway = class PlayerGateway {
    handlePlayerCreate(client, rec) {
        if (room_gateway_1.rooms.some((r) => r.room === rec.room)) {
            if (!playersInRooms.some((r) => r.room === rec.room)) {
                playersInRooms.push({
                    room: rec.room,
                    numberOfPlayers: 0,
                    players: [],
                });
            }
            playersInRooms.find((r) => r.room === rec.room).players.push(rec.player);
            this.wss
                .to(rec.room)
                .emit(webSocketEvents_1.default.SEND_PLAYERS, playersInRooms.find((r) => r.room === rec.room).players);
            this.wss.to(rec.room).emit(webSocketEvents_1.default.SEND_TECH, playersInRooms
                .find((r) => r.room === rec.room)
                .players.map((p) => p.playerMeeple));
        }
        else {
            this.wss.emit(webSocketEvents_1.default.CREATE_PLAYER_ERROR, `Room ${rec.room} not found!`);
        }
    }
    handleGetPlayers(client, room) {
        if (!playersInRooms.some((r) => r.room === room)) {
            playersInRooms.push({
                room: room,
                numberOfPlayers: 0,
                players: [],
            });
        }
        client.emit(webSocketEvents_1.default.SEND_PLAYERS, playersInRooms.find((r) => r.room === room).players);
    }
    handleGetTechnologies(client, room) {
        if (!playersInRooms.some((r) => r.room === room)) {
            playersInRooms.push({
                room: room,
                numberOfPlayers: 0,
                players: [],
            });
        }
        client.emit(webSocketEvents_1.default.SEND_TECH, playersInRooms
            .find((r) => r.room === room)
            .players.map((p) => p.playerMeeple));
    }
    handleContinue(client, room) {
        if (!playersInRooms.some((r) => r.room === room)) {
            this.wss.emit(webSocketEvents_1.default.CREATE_PLAYER_ERROR, `Room ${room} not found!`);
        }
        playersInRooms.find((r) => r.room === room).numberOfPlayers++;
        if (playersInRooms.find((r) => r.room === room).numberOfPlayers ===
            room_gateway_1.rooms.find((r) => r.room === room).players &&
            room_gateway_1.rooms.find((r) => r.room === room).players > 1) {
            this.wss.to(room).emit(webSocketEvents_1.default.READY);
            room_gateway_1.rooms.find((r) => r.room === room).players = 10;
        }
    }
    handleChangeOrder(client, rec) {
        [
            playersInRooms.find((r) => r.room === rec.room).players[rec.player - 1],
            playersInRooms.find((r) => r.room === rec.room).players[rec.player],
        ] = [
            playersInRooms.find((r) => r.room === rec.room).players[rec.player],
            playersInRooms.find((r) => r.room === rec.room).players[rec.player - 1],
        ];
        this.wss
            .to(rec.room)
            .emit(webSocketEvents_1.default.SEND_PLAYERS, playersInRooms.find((r) => r.room === rec.room).players);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PlayerGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.CREATE_PLAYER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], PlayerGateway.prototype, "handlePlayerCreate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.GET_PLAYERS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], PlayerGateway.prototype, "handleGetPlayers", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.GET_TECH),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], PlayerGateway.prototype, "handleGetTechnologies", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.CONTINUE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], PlayerGateway.prototype, "handleContinue", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.CHANGE_ORDER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], PlayerGateway.prototype, "handleChangeOrder", null);
PlayerGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], PlayerGateway);
exports.PlayerGateway = PlayerGateway;
//# sourceMappingURL=players.gateway.js.map