import {
  Body,
  Controller,
  Get,
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
  getBeatmap(@Body() body) {
    return this.beatmapsService.getBeatmap(body.id);
  }

  @Post()
  // @UsePipes(ValidationPipe)
  updateBeatmap(@Body() updateBeatmapDto: updateBeatmapDto) {
    console.log(updateBeatmapDto);
    return this.beatmapsService.updateBeatmap(updateBeatmapDto.id);
  }
}
