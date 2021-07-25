import { Test, TestingModule } from '@nestjs/testing';
import { SeminarRegistrationController } from './seminar-registration.controller';

describe('SeminarRegistrationController', () => {
  let controller: SeminarRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeminarRegistrationController],
    }).compile();

    controller = module.get<SeminarRegistrationController>(
      SeminarRegistrationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
