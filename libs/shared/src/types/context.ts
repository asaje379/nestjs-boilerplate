import { Auth } from '@prisma/client';
import { Request } from 'express';

export type ExecutionRequest = Request & {
  auth: Partial<Auth>;
  callbackUrl?: string;
};
