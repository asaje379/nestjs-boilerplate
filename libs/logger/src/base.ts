import { basicLogger } from './basic.logger';
import { winstonLogger } from './winstom.logger';

export const Loggers = {
  winston: winstonLogger,
  basic: basicLogger,
};
