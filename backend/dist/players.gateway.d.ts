import { Server, Socket } from 'socket.io';
export declare class PlayerGateway {
  wss: Server;
  handlePlayerCreate(
    client: Socket,
    rec: {
      room: string;
      player: any;
    },
  ): void;
  handleGetPlayers(client: Socket, room: string): void;
  handleGetTechnologies(client: Socket, room: string): void;
  handleContinue(client: Socket, room: string): void;
  handleChangeOrder(
    client: Socket,
    rec: {
      room: string;
      player: number;
    },
  ): void;
}
