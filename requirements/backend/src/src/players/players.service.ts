import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../typeorm/player.entity';
import { ScoresService } from 'src/scores/scores.service';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private readonly scoresService: ScoresService,
  ) {}

  getPlayers() {
    return this.playerRepository.find();
  }

  getPlayer(id: number) {
    return this.playerRepository.findOneBy({ id });
  }

  getPlayerByName(name: string) {
    return this.playerRepository.findOneBy({ name });
  }

  searchPlayersByName(name: string) {
    return this.playerRepository
      .createQueryBuilder('player')
      .where('player.name ILIKE :name', { name: `%${name}%` })
      .getMany();
  }

  createPlayer(id: number, name: string) {
    const player = new Player();
    player.id = id;
    player.name = name;
    player.topFRCount = 0;
    return this.playerRepository.save(player);
  }

  async updatePlayer(id: number) {
    let player = await this.getPlayer(id);
    if (!player) {
      throw new Error('Player not found');
    }
    player.topFRCount = await this.scoresService.getTopFRCount(id);
    await this.playerRepository.update(id, player);
  }
}
