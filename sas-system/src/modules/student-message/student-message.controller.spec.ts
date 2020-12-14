import { Test, TestingModule } from '@nestjs/testing';
import { StudentMessageController } from './student-message.controller';

describe('StudentMessage Controller', () => {
  let controller: StudentMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentMessageController],
    }).compile();

    controller = module.get<StudentMessageController>(StudentMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
