import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { SnipesService } from './snipes.service';

@Controller('snipes')
export class SnipesController {
  constructor(private readonly snipesService: SnipesService) {}

  // @Get()
  // getSnipes() {
  //   return this.snipesService.getSnipes();
  // }

  @Get('/latest')
  @UsePipes(ValidationPipe)
  getSnipesLatest(
    @Query() { limit }: { limit: number },
    @Query() { offset }: { offset: number },
    @Query() { order }: { order: 'ASC' | 'DESC' },
    @Query('victimless', new DefaultValuePipe(false), ParseBoolPipe)
    victimless: boolean,
  ) {
    if (limit > 100) limit = 100;
    return this.snipesService.getSnipesLatest(limit, offset, order, victimless);
  }

  @Get('/latest/:limit')
  getSnipesLimit(@Param() { limit }: { limit: number }) {
    return this.snipesService.getSnipesLimit(limit);
  }

  @Get('BeatmapID/:id')
  getSnipesByBeatmapID(@Param() { id }: { id: number }) {
    return this.snipesService.getSnipesByBeatmapID(id);
  }

  @Get('/player/:id')
  getSnipesByPlayerID(@Param('id', ParseIntPipe) id: number) {
    return this.snipesService.getSnipesByPlayerID(id);
  }
}
