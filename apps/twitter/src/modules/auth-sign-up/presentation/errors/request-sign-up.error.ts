import { ObjectType, PickType } from '@nestjs/graphql';

import { BaseError } from '@libs/exceptions';

@ObjectType()
export class RequestSignUpError extends PickType(BaseError, ['badRequest']) {}
