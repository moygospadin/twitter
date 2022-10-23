import { Field, ObjectType, PickType } from '@nestjs/graphql';

import { BaseError } from '@libs/exceptions';

@ObjectType()
export class SignInError extends PickType(BaseError, ['badRequest', 'notFound']) {
  @Field(() => String, { nullable: true })
  userAlreadyLogined?: string;
}
