import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { EmailService } from '@app/email';

@Controller()
@ApiTags('Health Check')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get('healthy')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-email')
  async testEmail() {
    return await this.emailService.sendEmail({
      to: 'salemaffa@gmail.com',
      subject: 'Test email notification',
      template: 'test',
      data: { name: 'Salem' },
    });
  }
}
