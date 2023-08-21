import * as chalk from 'chalk';

export const HandleError = function () {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const originalFn = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalFn.apply(this, args);
      } catch (error) {
        console.log(
          chalk.redBright(
            `[ERROR] - ${this.constructor.name}.${
              originalFn.name
            } - ${new Date().toLocaleString()} ${error.message}`,
          ),
        );
        return null;
      }
    };
  };
};
