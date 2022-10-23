import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@libs/exceptions';

export class MimeTypeIsNotAllowedException extends BaseException {
  constructor(context: string, description: string = null) {
    super('mimeTypeIsNotAllowed', HttpStatus.BAD_REQUEST, context, description);
  }
}
