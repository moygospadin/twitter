import { Catch, Logger } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';

import { BaseException } from '../../core';

@Catch(BaseException)
export class ExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  public catch(exception: BaseException) {
    const context = exception.getContext();
    const serializedName = exception.getSerializedName();
    const description = exception.getDescription();

    this.logger.error(description, exception.stack, context);

    return {
      error: {
        [serializedName]: description || serializedName,
      },
    };
  }
}
