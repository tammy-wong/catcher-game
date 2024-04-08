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

  async getTopPlayers(limit: number = 100): Promise<(Player & { rank: number })[] | null> {
    const players = await this.playersRepo.find({
      order: {
        score: 'DESC',
        createdAt: 'ASC'
      },
      take: limit
    })
    // Check if there are players' record
    if (!players || players.length === 0) {
      return null
    }

    const rankedPlayers = players.map((player, index) => {
      let rank = index + 1
      return { ...player, rank }
    })

    return rankedPlayers
  }
}
