import { Module } from '@nestjs/common';
import { BeatmapsController } from './beatmaps.controller';
import { BeatmapsService } from './beatmaps.service';

@Module({
  controllers: [BeatmapsController],
  providers: [BeatmapsService]
})
export class BeatmapsModule {}
