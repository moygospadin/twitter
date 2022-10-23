import { ObjectType, PickType } from '@nestjs/graphql';

import { BaseError } from '@libs/exceptions';

@ObjectType()
export class ReRequestSignUpError extends PickType(BaseError, ['badRequest', 'notFound']) {}
