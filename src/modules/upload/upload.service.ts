import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { extname } from 'path';
import { nanoid } from 'nanoid';
import { HandleError } from '@app/decorators';

export type MulterFile = Express.Multer.File;

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async getFile(id: string) {
    return await this.prisma.file.findUnique({ where: { id } });
  }

  @HandleError()
  async save(file: MulterFile) {
    const ext = extname(file.originalname);
    const reference = nanoid();
    const path = `uploads/${reference}${ext}`;

    writeFile(path, file.buffer);
    return await this.prisma.file.create({
      data: {
        originalName: file.originalname,
        path,
        size: file.size,
      },
    });
  }
}
