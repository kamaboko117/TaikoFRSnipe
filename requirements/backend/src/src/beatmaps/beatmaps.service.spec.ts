import { Test, TestingModule } from '@nestjs/testing';
import { BeatmapsService } from './beatmaps.service';

describe('BeatmapsService', () => {
  let service: BeatmapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeatmapsService],
    }).compile();

    service = module.get<BeatmapsService>(BeatmapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
