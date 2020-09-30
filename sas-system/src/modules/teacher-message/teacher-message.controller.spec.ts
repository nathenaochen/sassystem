import { Test, TestingModule } from '@nestjs/testing';
import { TeacherMessageController } from './teacher-message.controller';

describe('TeacherMessage Controller', () => {
  let controller: TeacherMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherMessageController],
    }).compile();

    controller = module.get<TeacherMessageController>(TeacherMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
