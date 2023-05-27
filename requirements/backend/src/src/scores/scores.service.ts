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

  getScore(id: number) {
    return this.scoreRepository.findOneBy({ id });
  }

  getScoreByBeatmapId(beatmapId: number) {
    return this.scoreRepository.findOneBy({ beatmapId });
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
}
