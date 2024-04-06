import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LeaderboardService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepo: Repository<Player>
  ) { }

  async getTopPlayers(limit: number = 100): Promise<Player[] | null> {
    return await this.playersRepo.find({
      order: {
        score: 'DESC'
      },
      take: limit
    })
  }
}
