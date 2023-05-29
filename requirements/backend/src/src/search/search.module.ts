import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PlayersModule } from '../players/players.module';
import { BeatmapsModule } from 'src/beatmaps/beatmaps.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [PlayersModule, BeatmapsModule],

})
export class SearchModule {}
