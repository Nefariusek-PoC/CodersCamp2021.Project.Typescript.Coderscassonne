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
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const app_messagehandler_service_1 = require("./app.messagehandler.service");
const webSocketEvents_1 = require("./constants/webSocketEvents");
let GameGateway = class GameGateway {
    afterInit(server) {
        console.log('initialized...');
    }
    handleConnection(client, ...args) {
        console.log(`connected client ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`disconnected client ${client.id}`);
    }
    handleEndOfTurn(client, rec) {
        const message = { nextPhase: rec.nextPhase, clientId: client.id };
        client.to(rec.room).emit(webSocketEvents_1.default.RECEIVE_NEXT_PHASE, message);
    }
    handleMeeplePlacement(client, rec) {
        const msgHandler = new app_messagehandler_service_1.MassageHandler();
        msgHandler.messageType = webSocketEvents_1.default.SEND_MEEPLE_PLACED;
        msgHandler.createMessage(client.id, rec.text);
        const { event, data } = msgHandler.sendMassage();
        client.to(rec.room).emit(event, data);
    }
    async handleClientJoined() {
        const allSockets = await this.wss.allSockets();
        if (allSockets.size === 1) {
            return { event: webSocketEvents_1.default.YOU_ARE_HOST, data: 'You are the host' };
        }
    }
    handleMessage(client, text) {
        const message = `Client with id: ${client.id} send a message: ${text}`;
        return { event: webSocketEvents_1.default.RECEIVE_MESSAGE, data: message };
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.SEND_NEXT_PHASE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleEndOfTurn", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.SEND_MEEPLE_PLACED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleMeeplePlacement", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.CLIENT_JOINED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleClientJoined", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(webSocketEvents_1.default.SEND_MESSAGE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Object)
], GameGateway.prototype, "handleMessage", null);
GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map