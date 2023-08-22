import { ExecutionRequest } from '@app/shared';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentAuth = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: ExecutionRequest = ctx.switchToHttp().getRequest();
  return req.auth;
});
