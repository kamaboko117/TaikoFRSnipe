import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { NotFoundInterceptor } from 'src/interceptor/interceptor';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get()
  async getScores() {
    return await this.scoresService.getScores();
  }

  @Get('beatmapID/:beatmapID')
  @UseInterceptors(new NotFoundInterceptor('Beatmap not found'))
  async getScoreByBeatmapId(@Param('beatmapID') beatmapID: number) {
    return this.scoresService.getScoreByBeatmapId(beatmapID);
  }

  @Get('top')
  async getTopScores(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('order') order: 'DESC' | 'ASC' = 'DESC',
    @Query('sort')
    sort: 'pp' | 'acc' | 'maxCombo' | 'missCount' | 'score' = 'pp',
  ) {
    return this.scoresService.getScoresSorted(limit, offset, sort, order);
  }

  @Get('player/:playerID')
  @UseInterceptors(new NotFoundInterceptor('Player not found'))
  async getScoresByPlayerId(
    @Param('playerID') playerID: number,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('order') order: 'DESC' | 'ASC' = 'DESC',
    @Query('sort')
    sort: 'pp' | 'acc' | 'maxCombo' | 'missCount' | 'score' | 'date' = 'pp',
  ) {
    return this.scoresService.getScoresByPlayerId(
      playerID,
      limit,
      offset,
      order,
      sort,
    );
  }
}
