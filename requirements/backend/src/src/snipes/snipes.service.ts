import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snipe } from '../typeorm/snipe.entity';

@Injectable()
export class SnipesService {
  constructor(
    @InjectRepository(Snipe)
    private snipeRepository: Repository<Snipe>,
  ) {}

  getSnipes() {
    return this.snipeRepository.find({ relations: ['beatmap', 'beatmap.mapset', 'beatmap.mapset.beatmaps'] });
  }

  getSnipe(id: number) {
    return this.snipeRepository.findOne({
      where: { id: id },
      relations: ['beatmap', 'beatmap.mapset'],
    });
  }

  getSnipesLimit(limit: number) {
    // retun newest snipes first (descending order)
    return this.snipeRepository.find({ take: limit, order: { timestamp: 'DESC' }, relations: ['beatmap', 'beatmap.mapset', 'beatmap.mapset.beatmaps'] });
  }

  createSnipe(snipe: Snipe) {
    return this.snipeRepository.save(snipe);
  }

  updateSnipe(snipe: Snipe) {
    return this.snipeRepository.update(snipe.id, snipe);
  }
}
