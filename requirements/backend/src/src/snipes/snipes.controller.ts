import { Controller, Get, Param, Query } from '@nestjs/common';
import { SnipesService } from './snipes.service';

@Controller('snipes')
export class SnipesController {
  constructor(private readonly snipesService: SnipesService) {}

  // @Get()
  // getSnipes() {
  //   return this.snipesService.getSnipes();
  // }

  @Get('/latest')
  getSnipesLatest(
    @Query() { limit }: { limit: number },
    @Query() { offset }: { offset: number },
    @Query() { order }: { order: 'ASC' | 'DESC' },
  ) {
    if (limit > 100) limit = 100;
    return this.snipesService.getSnipesLatest(limit, offset, order);
  }

  @Get('/latest/:limit')
  getSnipesLimit(@Param() { limit }: { limit: number }) {
    return this.snipesService.getSnipesLimit(limit);
  }

  @Get('BeatmapID/:id')
  getSnipesByBeatmapID(@Param() { id }: { id: number }) {
    return this.snipesService.getSnipesByBeatmapID(id);
  }
}
