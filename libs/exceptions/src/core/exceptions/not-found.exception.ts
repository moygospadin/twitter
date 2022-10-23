import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(context: string, description: string = null) {
    super('notFound', HttpStatus.NOT_FOUND, context, description);
  }
}
