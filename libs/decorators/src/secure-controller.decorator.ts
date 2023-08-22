import { kebabToCamel } from '@app/shared/helpers';
import { Controller, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export const SecureController = (controllerName: string, apiTag?: string) => {
  return applyDecorators(
    Controller(controllerName),
    ApiBearerAuth(),
    ApiTags(apiTag ?? kebabToCamel(controllerName)),
  );
};
