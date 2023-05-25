import { Module } from '@nestjs/common';
import { PlayersService } from './player.service';
import { ScoresModule } from 'src/scores/scores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../typeorm/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), ScoresModule],
  controllers: [],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
