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
    return this.snipeRepository.find({ relations: ['beatmap'] });
  }

  getSnipe(id: number) {
    return this.snipeRepository.findOne({
      where: { id: id },
      relations: ['beatmap'],
    });
  }

  getSnipesLimit(limit: number) {
    console.log(
      this.snipeRepository.find({ take: limit, relations: ['beatmap'] }),
    );
    return this.snipeRepository.find({ take: limit, relations: ['beatmap'] });
  }

  createSnipe(snipe: Snipe) {
    return this.snipeRepository.save(snipe);
  }

  updateSnipe(snipe: Snipe) {
    return this.snipeRepository.update(snipe.id, snipe);
  }
}
