import { logger, stdoutLogger } from '@app/logger';
import { InternalServerErrorException } from '@nestjs/common';

export const HandleError = function () {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalFn.apply(this, args);
      } catch (error) {
        stdoutLogger.log.error(
          `${this.constructor.name}.${originalFn.name}  ${error.message}`,
        );
        logger.log.error(
          `${new Date().toLocaleString()}: ${this.constructor.name}.${
            originalFn.name
          }  ${error.message}`,
        );
        throw new InternalServerErrorException(error.message);
      }
    };
  };
};
