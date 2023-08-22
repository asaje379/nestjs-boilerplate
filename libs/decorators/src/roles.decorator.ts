import { SetMetadata } from '@nestjs/common';
import { BasicRole } from '@prisma/client';

export const BASIC_ROLE_GUARD_NAME = 'role-guard';

export const BasicRoles = (...roles: BasicRole[]) =>
  SetMetadata(BASIC_ROLE_GUARD_NAME, roles);
