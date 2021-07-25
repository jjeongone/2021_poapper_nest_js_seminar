import { Test, TestingModule } from '@nestjs/testing';
import { SeminarController } from './seminar.controller';

describe('SeminarController', () => {
  let controller: SeminarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeminarController],
    }).compile();

    controller = module.get<SeminarController>(SeminarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
