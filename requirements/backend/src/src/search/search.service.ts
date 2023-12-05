import { Injectable } from '@nestjs/common';
import { PlayersService } from 'src/players/players.service';
import { MapsetsService } from 'src/mapsets/mapsets.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly playersService: PlayersService,
    private readonly mapsetsService: MapsetsService,
  ) {}

  async search(query: string) {
    const players = await this.playersService.searchPlayersByName(query);
    const mapsets = await this.mapsetsService.searchMapsets(query);
    return { players, mapsets };
  }
}
