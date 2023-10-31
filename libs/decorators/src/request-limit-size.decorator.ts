import { RequestLimitSizeInterceptor } from 'src/interceptors/request-size-limit.interceptor';
import { SetMetadata, UseInterceptors, applyDecorators } from '@nestjs/common';

export const REQUEST_SIZE_LIMIT_NAME = 'http-request-size-limit';

export const SetRequestSizeLimit = (limit: number | string) =>
  SetMetadata(REQUEST_SIZE_LIMIT_NAME, limit);

export const RequestSizeLimit = (limit: number | string) => {
  return applyDecorators(
    UseInterceptors(RequestLimitSizeInterceptor),
    SetRequestSizeLimit(limit),
  );
};
