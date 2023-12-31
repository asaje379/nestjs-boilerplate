import { Delete, Get, Query, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { EmailService } from '@app/email';
import { initPushEventSubscription } from '@asaje/sse-push-event-server';
import { Response } from 'express';
import { BasicRoles, SecureController } from '@app/decorators';
import { BasicRole } from '@prisma/client';
import { RequestSizeLimit } from '@app/decorators/request-limit-size.decorator';

@SecureController('', 'Default')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService,
  ) {}

  @Sse('events')
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

  @Get('test-request-size-limit')
  @RequestSizeLimit('0.1 kb')
  testRequestSizeLimit(): string {
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

  @Get('toobusy-test')
  async testTooBusy() {
    let i = 0;
    while (i < 1e5) i++;
    return i;
  }

  @Delete('remove-old-http-logs')
  @BasicRoles(BasicRole.ADMIN)
  async removeOldHttpLogs(@Query('limit') limit: string) {
    return await this.appService.removeOldHttpLogs(limit);
  }
}
