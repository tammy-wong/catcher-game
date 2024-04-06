import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepo: Repository<Player>
  ) { }

  async endGame(createPlayerDto: CreatePlayerDto): Promise<Player | null> {
    const { name, score } = createPlayerDto
    const player = new Player()
    player.name = name
    player.score = score

    return await this.playersRepo.save(player)
  }
}
