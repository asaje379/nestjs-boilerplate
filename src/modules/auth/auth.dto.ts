import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BasicRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class BasicAuthId {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional()
  username?: string;
}

export class BasicAuthRegister extends BasicAuthId {
  @IsEnum(BasicRole)
  @ApiProperty({ enum: BasicRole })
  role?: BasicRole;
}

export class BasicAuthCredentials extends BasicAuthId {
  @ApiProperty()
  @MinLength(6)
  password: string;
}

export class BasicAuthSetPassword {
  @ApiProperty() id: string;
  @MinLength(6)
  @ApiProperty()
  password: string;
}

export class CallbackUrlHeader {
  @IsOptional()
  @Matches(/^(https?):\/\/.*/, { message: 'callbackUrl is not a valid URL' })
  @ApiPropertyOptional()
  callbackUrl: string;
}
