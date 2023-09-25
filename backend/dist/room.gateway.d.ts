import { Server, Socket } from 'socket.io';
export declare const rooms: any[];
export declare class RoomGateway {
  wss: Server;
  handleRoomMessage(
    client: Socket,
    message: {
      sender: string;
      room: string;
      message: string;
    },
  ): void;
  handleRoomCreate(
    client: Socket,
    room: {
      name: string;
      password: string | undefined;
    },
  ): void;
  handleRoomJoin(
    client: Socket,
    room: {
      name: string;
      password: string | undefined;
    },
  ): void;
  handleRoomLeave(client: Socket, room: string): void;
  handleGetRooms(client: Socket): void;
}
