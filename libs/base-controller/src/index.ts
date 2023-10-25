import {
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { ActionName } from '@app/decorators';
import { Pagination } from '@app/shared/types/pagination';
import { ApiBody } from '@nestjs/swagger';
import { PrismaGenericRepository } from '@asaje/prisma-generic-repository';
import { BaseModel } from '@asaje/prisma-generic-repository/dist/typings';

export class GenericController<
  GenericService extends PrismaGenericRepository<
    BaseModel,
    unknown,
    unknown,
    unknown,
    unknown,
    unknown
  >,
> {
  constructor(protected readonly service: GenericService) {}

  @Get()
  @ActionName('Getting all')
  findAll(@Query() args: Pagination) {
    return this.service.findAndCount({
      paginationArgs: args,
      paginationOptions: {
        search: ['code', 'label'],
      },
    });
  }

  @Get(':id')
  @ActionName('Getting one')
  async findOne(@Param('id') id: string) {
    const data = await this.service.getById(id);
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  @Delete('many')
  @ApiBody({ type: [() => 'string'] })
  @ActionName('Archiving many')
  removeMany(@Body('ids') ids: string[]) {
    return this.service.archiveMany(ids);
  }

  @Delete('force/many')
  @ApiBody({ type: [() => 'string'] })
  @ActionName('Deleting many')
  deleteMany(@Body('ids') ids: string[]) {
    return this.service.deleteMany(ids);
  }

  @Delete(':id')
  @ActionName('Archiving one')
  remove(@Param('id') id: string) {
    return this.service.archive(id);
  }

  @Delete(':id/force')
  @ActionName('Removing one')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
