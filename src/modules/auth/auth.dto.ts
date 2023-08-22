import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BasicRole } from '@prisma/client';

export class BasicAuthId {
  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  username?: string;
}

export class BasicAuthRegister extends BasicAuthId {
  @ApiProperty({ enum: BasicRole })
  role?: BasicRole;
}

export class BasicAuthCredentials extends BasicAuthId {
  @ApiProperty()
  password: string;
}

export class BasicAuthSetPassword {
  @ApiProperty() id: string;
  @ApiProperty() password: string;
}
