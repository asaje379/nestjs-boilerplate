import {
  Get,
  Param,
  Post,
  Res,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile, UploadService } from './upload.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { join } from 'path';
import { Response } from 'express';
import { CurrentHost, SecureController } from '@app/decorators';

@SecureController('file', 'File upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: MulterFile,
    @CurrentHost() host: string,
  ) {
    const _file = await this.uploadService.save(file);
    if (!_file) {
      throw new UnprocessableEntityException('Unable to upload file');
    }
    return { url: join(host, 'file/download', _file.id) };
  }

  @Get('download/:id')
  async getFile(@Param('id') _id: string, @Res() response: Response) {
    const file = await this.uploadService.getFile(_id);
    if (!file) {
      throw new UnprocessableEntityException('Failed to get file');
    }
    return response.download(file.path, file.originalName);
  }
}
