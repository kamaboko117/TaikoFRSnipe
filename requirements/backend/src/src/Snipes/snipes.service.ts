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
    return this.snipeRepository.find();
  }

  getSnipe(id: number) {
    return this.snipeRepository.findOneBy({ id });
  }

  createSnipe(snipe: Snipe) {
    return this.snipeRepository.save(snipe);
  }

  updateSnipe(snipe: Snipe) {
    return this.snipeRepository.update(snipe.id, snipe);
  }
}
