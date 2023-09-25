import { Socket } from 'socket.io';
export declare class TilesGateway {
    handleTilePlacementMessage(client: Socket, rec: {
        room: string;
        tileData: string;
    }): void;
    handleTileInHandRotated(client: Socket, rec: {
        room: string;
        rotation: number;
    }): void;
}
