import { Test, TestingModule } from '@nestjs/testing';
import { TeacherMessageService } from './teacher-message.service';

describe('TeacherMessageService', () => {
  let service: TeacherMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherMessageService],
    }).compile();

    service = module.get<TeacherMessageService>(TeacherMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
