import { ExecutionRequest } from './../utils/typings';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentHost = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: ExecutionRequest = ctx.switchToHttp().getRequest();
  return `${req.protocol}://${req.get('host')}`;
});
