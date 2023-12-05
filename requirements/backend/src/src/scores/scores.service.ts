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

  getScoresSorted(
    limit: number,
    offset: number,
    sort: 'pp' | 'acc' | 'maxCombo' | 'missCount' | 'score' | 'date' = 'pp',
    order: 'ASC' | 'DESC' = 'DESC',
  ) {
    if (limit > 100) {
      limit = 100;
    }
    const orderObj = {};
    orderObj[sort] = order;
    return this.scoreRepository.find({
      order: orderObj,
      take: limit,
      skip: offset,
      relations: ['player', 'beatmap'],
    });
  }

  getScoresByPlayerId(
    playerId: number,
    limit: number,
    offset: number,
    order: 'ASC' | 'DESC' = 'DESC',
    sort:
      | 'pp'
      | 'acc'
      | 'maxCombo'
      | 'missCount'
      | 'score'
      | 'date'
      | 'sr' = 'pp',
  ) {
    if (limit > 100) {
      limit = 100;
    }
    const orderObj = {};
    orderObj[sort] = order;
    if (sort === 'sr') {
      return this.scoreRepository
        .createQueryBuilder('score')
        .leftJoinAndSelect('score.beatmap', 'beatmap')
        .where('score.playerId = :playerId', { playerId })
        .orderBy('beatmap.sr', order)
        .take(limit)
        .skip(offset)
        .getMany();
    }
    return this.scoreRepository.find({
      where: { player: { id: playerId } },
      order: orderObj,
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

  getHighestPPPlay() {
    return this.scoreRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.beatmap', 'beatmap')
      .orderBy('score.pp', 'DESC')
      .take(1)
      .getOne();
  }

  getLongestPlay() {
    return this.scoreRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.beatmap', 'beatmap')
      .orderBy('score.score', 'DESC')
      .take(1)
      .getOne();
  }

  getMostMisses() {
    return this.scoreRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.beatmap', 'beatmap')
      .orderBy('score.missCount', 'DESC')
      .take(1)
      .getOne();
  }

  getLessAcc() {
    return this.scoreRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.beatmap', 'beatmap')
      .orderBy('score.acc', 'ASC')
      .take(1)
      .getOne();
  }
  
  getOldestScore() {
    return this.scoreRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.beatmap', 'beatmap')
      .orderBy('score.date', 'ASC')
      .take(1)
      .getOne();
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
