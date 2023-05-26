import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BeatmapsService } from './beatmaps.service';
import { updateBeatmapDto } from './beatmaps.dto';

@Controller('beatmaps')
export class BeatmapsController {
  constructor(private readonly beatmapsService: BeatmapsService) {}
  @Get()
  getBeatmaps() {
    return this.beatmapsService.getBeatmaps();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  getBeatmap(@Param('id', ParseIntPipe) id: number) {
    console.log(`Getting beatmap ${id}`);
    return this.beatmapsService.getBeatmap(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  updateBeatmap(@Body() updateBeatmapDto: updateBeatmapDto) {
    console.log(updateBeatmapDto);
    return this.beatmapsService.updateBeatmap(updateBeatmapDto.id);
  }
}
