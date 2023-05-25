import { Module } from '@nestjs/common';
import { SnipesService } from './snipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snipe } from '../typeorm/snipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Snipe])],
  controllers: [],
  providers: [SnipesService],
  exports: [SnipesService],
})
export class SnipesModule {}
