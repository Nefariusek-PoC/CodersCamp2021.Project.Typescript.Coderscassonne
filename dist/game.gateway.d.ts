import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    wss: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleDisconnect(client: Socket): void;
    handleEndOfTurn(client: Socket, rec: {
        room: string;
        nextPhase: boolean;
    }): void;
    handleMeeplePlacement(client: Socket, rec: {
        room: string;
        text: string;
    }): void;
    handleClientJoined(): Promise<WsResponse<string>>;
    handleMessage(client: Socket, text: string): WsResponse<string>;
}
