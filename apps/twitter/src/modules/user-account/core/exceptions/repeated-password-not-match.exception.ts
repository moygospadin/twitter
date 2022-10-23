import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@libs/exceptions';

export class RepeatedPasswordNotMatchException extends BaseException {
  constructor(context: string, description: string = null) {
    super('repeatedPasswordNotMatch', HttpStatus.BAD_REQUEST, context, description);
  }
}
