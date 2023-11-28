import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';

class TestDto {
  @ApiProperty() name: string;
  @ApiProperty() email: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id/:name')
  test(
    @Param('id') id: string,
    @Param('name') name: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    return { id, name, page, limit };
  }

  @Post('post/:id/:name')
  testPost(
    @Param('id') id: string,
    @Param('name') name: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Body() data: TestDto,
  ) {
    return { id, name, page, limit, data };
  }
}
