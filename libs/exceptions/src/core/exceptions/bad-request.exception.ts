import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
  constructor(context: string, description: string = null) {
    super('badRequest', HttpStatus.BAD_REQUEST, context, description);
  }
}
