import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PlayersModule } from '../players/players.module';
import { MapsetsModule } from 'src/mapsets/mapsets.module';
@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [PlayersModule, MapsetsModule],
})
export class SearchModule {}
