import { Test, TestingModule } from '@nestjs/testing';
import { BeatmapsController } from './beatmaps.controller';

describe('BeatmapsController', () => {
  let controller: BeatmapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeatmapsController],
    }).compile();

    controller = module.get<BeatmapsController>(BeatmapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
