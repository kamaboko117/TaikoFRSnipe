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
  UseInterceptors,
} from '@nestjs/common';
import { SnipesService } from './snipes.service';
import { NotFoundInterceptor } from 'src/interceptor/interceptor';

@Controller('snipes')
// @UseInterceptors(NotFoundInterceptor)
export class SnipesController {
  constructor(private readonly snipesService: SnipesService) {}

  // @Get()
  // getSnipes() {
  //   return this.snipesService.getSnipes();
  // }

  @Get('/latest')
  @UsePipes(ValidationPipe)
  getSnipesLatest(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query() { order }: { order: 'ASC' | 'DESC' },
    @Query('victimless', new DefaultValuePipe(false), ParseBoolPipe)
    victimless: boolean,
  ) {
    if (limit > 100 || limit < 0) limit = 100;
    return this.snipesService.getSnipesLatest(limit, offset, order, victimless);
  }

  @Get('/latest/:limit')
  getSnipesLimit(
    @Param('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
  ) {
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
