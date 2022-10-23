import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class ForbiddenException extends BaseException {
  constructor(context: string, description: string = null) {
    super('forbidden', HttpStatus.FORBIDDEN, context, description);
  }
}
