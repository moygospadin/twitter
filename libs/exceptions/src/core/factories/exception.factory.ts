import { BadRequestException, BaseException } from '../exceptions';

export const exceptionFactory = (): BaseException => {
  return new BadRequestException('');
};
