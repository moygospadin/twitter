import { Field, ObjectType, PickType } from '@nestjs/graphql';

import { BaseError } from '@libs/exceptions';

@ObjectType()
export class RefreshTokenError extends PickType(BaseError, ['badRequest', 'notFound']) {
  @Field(() => String, { nullable: true })
  refreshTokenExpired?: string;
}
