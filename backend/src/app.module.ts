import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GameGateway } from './game.gateway';
import { MassageHandler } from './app.messagehandler.service';
import { AppService } from './app.service';
import { RoomGateway } from './room.gateway';
import { TilesGateway } from './tiles/tiles.gateway';
import { TilesModule } from './tiles/tiles.module';
import { PlayerGateway } from './players.gateway';
import { TilesDbModule } from './tiles-db/tiles-db.module';

import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    TilesModule,
    TilesDbModule,
    MongooseModule.forRoot(
      `mongodb+srv://<user>:<password>@cluster0.rvske.mongodb.net/coderscassonne1?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    GameGateway,
    MassageHandler,
    TilesGateway,
    RoomGateway,
    PlayerGateway,
  ],
})
export class AppModule {}
