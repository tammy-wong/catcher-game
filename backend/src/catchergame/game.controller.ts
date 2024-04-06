import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) { }

  @Post('end')
  async endGame(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.gameService.endGame(createPlayerDto)
  }
}
