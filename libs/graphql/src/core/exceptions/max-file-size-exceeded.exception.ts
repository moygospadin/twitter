import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@libs/exceptions';

export class MaxFileSizeExceededException extends BaseException {
  constructor(context: string, description: string = null) {
    super('maxFileSizeExceeded', HttpStatus.BAD_REQUEST, context, description);
  }
}
