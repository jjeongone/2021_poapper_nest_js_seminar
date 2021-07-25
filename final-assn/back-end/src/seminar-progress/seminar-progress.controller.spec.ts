import { Test, TestingModule } from '@nestjs/testing';
import { SeminarProgressController } from './seminar-progress.controller';

describe('SeminarProgressController', () => {
  let controller: SeminarProgressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeminarProgressController],
    }).compile();

    controller = module.get<SeminarProgressController>(SeminarProgressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
