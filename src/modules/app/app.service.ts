import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Api is working!';
  }

  async removeOldHttpLogs(limit: string) {
    const dateLimit = new Date(limit);
    await this.prisma.httpLog.deleteMany({
      where: { createdAt: { lt: dateLimit } },
    });
    return { message: 'Done' };
  }
}
