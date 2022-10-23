import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@libs/exceptions';

export class UserAlreadyLoginedException extends BaseException {
  constructor(context: string, description: string = null) {
    super('userAlreadyLogined', HttpStatus.BAD_REQUEST, context, description);
  }
}
