import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScoreEntity } from '../typeorm/score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(ScoreEntity)
    private scoreRepository: Repository<ScoreEntity>,
  ) {}

  getScores() {
    return this.scoreRepository.find();
  }

  getScoresByPP(limit: number, offset: number) {
    if (limit > 100) {
      limit = 100;
    }
    return this.scoreRepository.find({
      order: { pp: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['player', 'beatmap'],
    });
  }

  getScoresByPlayerId(playerId: number, limit: number, offset: number) {
    if (limit > 100) {
      limit = 100;
    }
    return this.scoreRepository.find({
      where: { player: { id: playerId } },
      order: { pp: 'DESC' },
      take: limit,
      skip: offset,
      relations: ['beatmap', 'player'],
    });
  }

  getScore(id: number) {
    return this.scoreRepository.findOneBy({ id });
  }

  getScoreByBeatmapId(beatmapId: number) {
    return this.scoreRepository.findOne({
      where: { beatmap: { id: beatmapId } },
      relations: ['player'],
    });
  }

  createScore(score: ScoreEntity) {
    return this.scoreRepository.save(score);
  }

  getTopFRCount(playerId: number) {
    return this.scoreRepository.countBy({ player: { id: playerId } });
  }

  updateScore(score: ScoreEntity) {
    return this.scoreRepository.update(score.id, score);
  }

  updateScoreByBeatmapId(beatmapId: number, score: ScoreEntity) {
    return this.scoreRepository.update({ beatmapId: beatmapId }, score);
  }
}
