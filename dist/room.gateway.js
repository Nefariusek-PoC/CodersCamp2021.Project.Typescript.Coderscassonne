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
exports.RoomGateway = exports.rooms = void 0;
const websockets_1 = require("@nestjs/websockets");
const webSocketEvents_1 = require("./constants/webSocketEvents");
const socket_io_1 = require("socket.io");
exports.rooms = [];
let RoomGateway = class RoomGateway {
    handleRoomMessage(client, message) {
        this.wss
            .to(message.room)
            .emit(webSocketEvents_1.default.SEND_MESSAGE_TO_ROOM, message);
    }
    handleRoomCreate(client, room) {
        if (!exports.rooms.some((r) => r.room === room.name)) {
            exports.rooms.push({ room: room.name, password: room.password, players: 0 });
            client.broadcast.emit(webSocketEvents_1.default.SEND_ROOMS, exports.rooms
                .filter((r) => r.players < 5)
                .map((r) => {
                return { name: r.room, password: !!r.password, players: r.players };
            }));
        }
        else {
            this.wss.emit(webSocketEvents_1.default.CREATE_ROOM_ERROR, `Room ${room.name} already exists!`);
        }
    }
    handleRoomJoin(client, room) {
        if (exports.rooms.some((r) => r.room === room.name && r.password === room.password)) {
            if (exports.rooms.find((r) => r.room === room.name).players < 5) {
                client.join(room.name);
                exports.rooms.find((r) => r.room === room.name).players++;
                client.emit(webSocketEvents_1.default.JOINED_ROOM, room.name);
                console.log(`client: ${client.id} joins room: ${room.name}`);
                client.broadcast.emit(webSocketEvents_1.default.SEND_ROOMS, exports.rooms
                    .filter((r) => r.players < 5)
                    .map((r) => {
                    return {
                        name: r.room,
                        password: !!r.password,
                        players: r.players,
                    };
                }));
            }
            else {
                client.emit(webSocketEvents_1.default.JOIN_ROOM_ERROR, `Room ${room.name} is full!`);
            }
        }
        else {
            client.emit(webSocketEvents_1.default.JOIN_ROOM_ERROR, `Wrong password!`);
        }
    }
    handleRoomLeave(client, room) {
        client.leave(room);
        exports.rooms.find((r) => r.room === room).players--;
        client.emit(webSocketEvents_1.default.LEFT_ROOM, room);
        client.broadcast.emit(webSocketEvents_1.default.SEND_ROOMS, exports.rooms
            .filter((r) => r.players < 5)
            .map((r) => {
            return { name: r.room, password: !!r.password, players: r.players };
        }));
    }
    handleGetRooms(client) {
        client.emit(webSocketEvents_1.default.SEND_ROOMS, exports.rooms
            .filter((r) => r.players < 5)
            .map((r) => {
            return { name: r.room, password: !!r.password, players: r.players };
        }));
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RoomGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.RECEIVE_MESSAGE_FROM_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleRoomMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.CREATE_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleRoomCreate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.JOIN_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleRoomJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.LEAVE_ROOM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleRoomLeave", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.GET_ROOMS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], RoomGateway.prototype, "handleGetRooms", null);
RoomGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], RoomGateway);
exports.RoomGateway = RoomGateway;
//# sourceMappingURL=room.gateway.js.map