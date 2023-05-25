import { Module } from '@nestjs/common';
import { SnipesService } from './snipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Snipe } from '../typeorm/snipe.entity';
import { SnipesController } from './snipes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Snipe])],
  controllers: [SnipesController],
  providers: [SnipesService],
  exports: [SnipesService],
})
export class SnipesModule {}
