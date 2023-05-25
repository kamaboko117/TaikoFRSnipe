import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { ScoresModule } from 'src/scores/scores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../typeorm/player.entity';
import { PlayersController } from './players.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), ScoresModule],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
