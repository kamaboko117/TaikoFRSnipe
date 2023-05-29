import { Injectable } from '@nestjs/common';
import { BeatmapsService } from 'src/beatmaps/beatmaps.service';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly playersService: PlayersService,
    private readonly beatmapsService: BeatmapsService,
  ) {}

  async search(query: string) {
    const players = await this.playersService.searchPlayersByName(query);
    const beatmaps = await this.beatmapsService.searchBeatmaps(query);
    return { players, beatmaps };
  }
}
