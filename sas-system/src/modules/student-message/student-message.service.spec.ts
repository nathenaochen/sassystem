import { Test, TestingModule } from '@nestjs/testing';
import { StudentMessageService } from './student-message.service';

describe('StudentMessageService', () => {
  let service: StudentMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentMessageService],
    }).compile();

    service = module.get<StudentMessageService>(StudentMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
