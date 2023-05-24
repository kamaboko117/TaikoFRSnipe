import { Body, Controller, Get, Post } from '@nestjs/common';
import { BeatmapsService } from './beatmaps.service';

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
  updateBeatmap(@Body() body) {
    return this.beatmapsService.updateBeatmap(body);
  }
}
