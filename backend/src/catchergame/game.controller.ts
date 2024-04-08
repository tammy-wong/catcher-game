import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { AppGateway } from 'src/app.gateway';
import { LeaderboardService } from './leaderboard.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly appGateway: AppGateway,
    private readonly leaderboardService: LeaderboardService
  ) { }

  @Post('end')
  async endGame(@Body() createPlayerDto: CreatePlayerDto) {
    const update = await this.gameService.endGame(createPlayerDto)
    const result = await this.leaderboardService.getTopPlayers()
    this.appGateway.server.emit('newPlayer', result)
    return update
  }
}
