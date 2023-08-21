import { ExecutionRequest } from '@app/shared';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentHost = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: ExecutionRequest = ctx.switchToHttp().getRequest();
  return `${req.protocol}://${req.get('host')}`;
});
