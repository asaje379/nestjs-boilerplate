import { ExecutionRequest } from '@app/shared';
import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { CallbackUrlHeader } from 'src/modules/auth/auth.dto';

export const CallbackUrl = createParamDecorator(
  async (_, ctx: ExecutionContext) => {
    const req: ExecutionRequest = ctx.switchToHttp().getRequest();
    const data = new CallbackUrlHeader();
    data.callbackUrl = req.headers['x-callback-url'] as string;
    const errors = await validate(data);
    if (errors.length === 0) return data.callbackUrl;
    throw new BadRequestException(Object.values(errors[0].constraints));
  },
);
