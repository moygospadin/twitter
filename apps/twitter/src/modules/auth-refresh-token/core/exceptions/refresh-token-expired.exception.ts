import { HttpStatus } from '@nestjs/common';

import { BaseException } from '@libs/exceptions';

export class RefreshTokenExpiredException extends BaseException {
  constructor(context: string, description: string = null) {
    super('refreshTokenExpired', HttpStatus.BAD_REQUEST, context, description);
  }
}
