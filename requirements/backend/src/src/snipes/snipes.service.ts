import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Snipe } from '../typeorm/snipe.entity';
import { Player } from 'src/typeorm/player.entity';

@Injectable()
export class SnipesService {
  constructor(
    @InjectRepository(Snipe)
    private snipeRepository: Repository<Snipe>,
  ) {}

  getSnipes() {
    return this.snipeRepository.find({
      relations: ['beatmap', 'beatmap.mapset', 'beatmap.mapset.beatmaps'],
    });
  }

  getSnipe(id: number) {
    return this.snipeRepository.findOne({
      where: { id: id },
      relations: ['beatmap', 'beatmap.mapset'],
    });
  }

  getSnipesByBeatmapID(id: number) {
    return this.snipeRepository.find({
      where: { beatmap: { id: id } },
    });
  }

  getSnipesByPlayerID(id: number) {
    console.log(id);
    console.log(typeof id);

    return this.snipeRepository
      .createQueryBuilder('snipe')
      .leftJoinAndSelect('snipe.beatmap', 'beatmap')
      .where('snipe.sniper ILIKE :id', { id: `%${id}%` })
      .orWhere('snipe.victim ILIKE :id', { id: `%${id}%` })
      .take(100)
      .getMany();
  }

  getSnipesLimit(limit: number) {
    // retun newest snipes first (descending order)
    return this.snipeRepository.find({
      take: limit,
      order: { timestamp: 'DESC' },
      relations: ['beatmap', 'beatmap.mapset', 'beatmap.mapset.beatmaps'],
    });
  }

  getSnipesLatest(
    limit: number,
    offset: number,
    order: 'ASC' | 'DESC',
    victimless: boolean,
  ) {
    if (victimless === true) {
      return this.snipeRepository.find({
        order: { timestamp: order },
        where: { victim: Not(IsNull()) },
        take: limit,
        skip: offset,
        relations: ['beatmap', 'beatmap.mapset', 'beatmap.mapset.beatmaps'],
      });
    }
    return this.snipeRepository.find({
      order: { timestamp: order },
      take: limit,
      skip: offset,
      relations: ['beatmap', 'beatmap.mapset', 'beatmap.mapset.beatmaps'],
    });
  }

  createSnipe(snipe: Snipe) {
    return this.snipeRepository.save(snipe);
  }

  updateSnipe(snipe: Snipe) {
    return this.snipeRepository.update(snipe.id, snipe);
  }
}
