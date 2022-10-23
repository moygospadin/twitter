import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor(context: string, description: string = null) {
    super('unauthorized', HttpStatus.UNAUTHORIZED, context, description);
  }
}
