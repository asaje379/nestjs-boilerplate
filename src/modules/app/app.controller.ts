import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { EmailService } from '@app/email';
import { initPushEventSubscription } from '@asaje/sse-push-event-server';
import { Response } from 'express';

@Controller()
@ApiTags('Health Check')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Get('events')
  @ApiExcludeEndpoint()
  events(@Res() response: Response) {
    const { value, destroy } = initPushEventSubscription();
    response.on('close', () => destroy());

    return value;
  }

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
