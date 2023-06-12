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

  getTopPlayers(limit: number, offset: number, order: 'ASC' | 'DESC') {
    return this.playerRepository.find({
      order: { topFRCount: order },
      take: limit,
      skip: offset,
    });
  }

  async getModLover(mod: string) {
    const modLover = await this.playerRepository
      .createQueryBuilder('player')
      .innerJoin('player.scores', 'score')
      .where('score.mods @> ARRAY[:mod]', { mod })
      .groupBy('player.id')
      .orderBy('COUNT(score.id)', 'DESC')
      .limit(1)
      .getOne();
    
    if (modLover) {
      const playerId = modLover.id;

      return (this.playerRepository.findOne({where: {id: playerId}, relations: ['scores']}));
    }
    return null;
  }

  async getHallOfFame() {
    const highestPPPlay = this.scoresService.getHighestPPPlay();
    const longestPlay = this.scoresService.getLongestPlay();
    const mostMisses = this.scoresService.getMostMisses();
    const lessAcc = this.scoresService.getLessAcc();
    // gets the player with the most FL plays
    const FLModLover = this.getModLover('FL');
   
    const OldestScore = this.scoresService.getOldestScore();

    const values_1 = await Promise.all([
      highestPPPlay,
      longestPlay,
      mostMisses,
      lessAcc,
      FLModLover,
      // HDModLover,
      // HRModLover,
      // DTModLover,
      // EZModLover,
      // NCModLover,
      OldestScore,
    ]);
    return {
      highestPPPlay: values_1[0],
      longestPlay: values_1[1],
      mostMisses: values_1[2],
      lessAcc: values_1[3],
      FLModLover: values_1[4],
      // HDModLover: values[5],
      // HRModLover: values[6],
      // DTModLover: values[7],
      // EZModLover: values[8],
      // NCModLover: values[9],
      OldestScore: values_1[5],
    };
  }

  searchPlayersByName(name: string) {
    const limit = 10;
    return this.playerRepository
      .createQueryBuilder('player')
      .where('player.name ILIKE :name', { name: `%${name}%` })
      .take(limit)
      .getMany();
  }

  createPlayer(id: number, name: string) {
    const player = new Player();
    player.id = id;
    player.name = name;
    player.topFRCount = 1;
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
