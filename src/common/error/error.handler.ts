import { Logger } from '@nestjs/common';

export const errorHandler = function (
  logger: Logger,
  error: unknown,
  methodName: string,
) {
  logger.error(`Error occured in method ${methodName}()`);
  logger.error(error);
};
