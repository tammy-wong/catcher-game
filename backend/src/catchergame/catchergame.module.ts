import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { SocketService } from 'src/socket/socket.service';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [LeaderboardController, GameController],
  providers: [LeaderboardService, GameService, SocketService, AppGateway],
})
export class CatcherGameModule {}
