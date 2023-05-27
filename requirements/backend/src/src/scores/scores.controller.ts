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
  ) {
    return this.scoresService.getScoresByPP(limit, offset);
  }
}
