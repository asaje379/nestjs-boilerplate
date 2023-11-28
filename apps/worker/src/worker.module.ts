import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [LoggerModule],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkerModule {}
