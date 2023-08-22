import { ApiPropertyOptional } from '@nestjs/swagger';

export class Pagination {
  @ApiPropertyOptional() page?: number;
  @ApiPropertyOptional() limit?: number;
  @ApiPropertyOptional() search?: string;
  @ApiPropertyOptional() from?: string;
  @ApiPropertyOptional() to?: string;
  @ApiPropertyOptional() take?: number;
  @ApiPropertyOptional() skip?: number;
}
