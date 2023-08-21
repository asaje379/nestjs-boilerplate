import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { EmailModule } from '@app/email';

@Module({
  imports: [AuthModule, UploadModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
