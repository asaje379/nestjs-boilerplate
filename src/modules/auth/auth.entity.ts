import { Auth } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AuthEntity {
  @Exclude()
  password: string;

  constructor(partial: Partial<Auth>) {
    Object.assign(this, partial);
  }
}
