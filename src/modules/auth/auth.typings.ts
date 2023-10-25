import { Auth } from '@prisma/client';
import { AuthAction } from './auth.enum';

export type GenerateAndSendUrlArgs = {
  host: string;
  auth: Auth;
  action: AuthAction;
  template: string;
  callbackUrl?: string;
};
