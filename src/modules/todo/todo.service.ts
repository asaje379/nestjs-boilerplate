import { PrismaService } from '@app/prisma';
import { PrismaGenericRepository } from '@asaje/prisma-generic-repository';
import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodoService extends PrismaGenericRepository<
  Prisma.TodoDelegate<any>,
  Todo,
  Prisma.TodoUncheckedCreateInput,
  Prisma.TodoUncheckedUpdateInput,
  Prisma.TodoWhereInput,
  Prisma.TodoSelect
> {
  constructor(private prisma: PrismaService) {
    super();
    this.model = this.prisma.todo;
  }
}
