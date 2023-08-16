import { PrismaService } from '@app/prisma';
import { PrismaGenericRepository } from '@asaje/prisma-generic-repository';
import { Injectable } from '@nestjs/common';
import { Auth, Prisma } from '@prisma/client';

@Injectable()
export class AuthService extends PrismaGenericRepository<
  Prisma.AuthDelegate<any>,
  Auth,
  Prisma.AuthUncheckedCreateInput,
  Prisma.AuthUncheckedUpdateInput,
  Prisma.AuthWhereInput,
  Prisma.AuthSelect
> {
  constructor(private readonly prisma: PrismaService) {
    super();
    this.model = this.prisma.auth;
  }
}
