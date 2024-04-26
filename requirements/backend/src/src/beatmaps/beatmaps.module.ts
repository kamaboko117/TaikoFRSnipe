import { Module } from '@nestjs/common';
import { BeatmapsController } from './beatmaps.controller';
import { BeatmapsService } from './beatmaps.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beatmap } from 'src/typeorm/beatmap.entity';
import { ScoreEntity } from 'src/typeorm/score.entity';
import { Snipe } from 'src/typeorm/snipe.entity';
import { ScoresModule } from 'src/scores/scores.module';
import { PlayersModule } from 'src/players/players.module';
import { SnipesModule } from 'src/snipes/snipes.module';
import { MapsetsModule } from 'src/mapsets/mapsets.module';
import { UtilModule } from 'src/util/util.module';

@Module({
  controllers: [BeatmapsController],
  providers: [BeatmapsService],
  exports: [BeatmapsService],
  imports: [
    TypeOrmModule.forFeature([Beatmap, ScoreEntity, Snipe]),
    ScoresModule,
    PlayersModule,
    SnipesModule,
    MapsetsModule,
    UtilModule,
  ],
})
export class BeatmapsModule {}
