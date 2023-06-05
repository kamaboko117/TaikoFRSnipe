import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BeatmapsService } from './beatmaps.service';
import { updateBeatmapDto } from './beatmaps.dto';
import { NotFoundInterceptor } from 'src/interceptor/interceptor';

@Controller('beatmaps')
export class BeatmapsController {
  constructor(private readonly beatmapsService: BeatmapsService) {}

  @Get()
  getBeatmaps(
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    return this.beatmapsService.getBeatmaps(limit, offset);
  }

  @Get('populate')
  populateBeatmaps() {
    console.log('populating beatmaps');
    return this.beatmapsService.populateBeatmaps();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(new NotFoundInterceptor('Beatmap not found'))
  getBeatmap(@Param('id', ParseIntPipe) id: number) {
    console.log(`Getting beatmap ${id}`);
    return this.beatmapsService.getBeatmap(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(new NotFoundInterceptor('Beatmap not found'))
  updateBeatmap(@Body() updateBeatmapDto: updateBeatmapDto) {
    console.log(updateBeatmapDto);
    return this.beatmapsService.updateBeatmap(updateBeatmapDto.id, {
      batch: false,
    });
  }
}
