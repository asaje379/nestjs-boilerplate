import { Test, TestingModule } from '@nestjs/testing';
import { CustomLogger } from './logger.service';

describe('LoggerService', () => {
  let service: CustomLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomLogger],
    }).compile();

    service = module.get<CustomLogger>(CustomLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
